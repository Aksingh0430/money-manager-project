const express = require('express');
const router = express.Router();
const { body, validationResult, query } = require('express-validator');
const Transaction = require('../models/Transaction');

// Validation middleware
const transactionValidation = [
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('category').notEmpty().withMessage('Category is required'),
  body('division').isIn(['office', 'personal']).withMessage('Division must be office or personal'),
  body('description').notEmpty().withMessage('Description is required').isLength({ max: 200 }).withMessage('Description too long'),
  body('date').optional().isISO8601().withMessage('Invalid date format')
];

// Get all transactions with filters
router.get('/', async (req, res) => {
  try {
    const { 
      type, 
      division, 
      category, 
      startDate, 
      endDate,
      page = 1,
      limit = 50
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (type) filter.type = type;
    if (division) filter.division = division;
    if (category) filter.category = category;
    
    // Date range filter
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('accountId', 'name');

    const total = await Transaction.countDocuments(filter);

    res.json({
      success: true,
      data: transactions,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single transaction
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('accountId', 'name');
    
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new transaction
router.post('/', transactionValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const transaction = new Transaction(req.body);
    await transaction.save();

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update transaction (with 12-hour restriction)
router.put('/:id', transactionValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    // Check 12-hour edit restriction
    if (!transaction.canEdit()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Cannot edit transaction after 12 hours' 
      });
    }

    // Update fields
    Object.assign(transaction, req.body);
    transaction.updatedAt = Date.now();
    
    await transaction.save();

    res.json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    await transaction.deleteOne();

    res.json({ success: true, message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get summary by period (monthly, weekly, yearly)
router.get('/summary/period', async (req, res) => {
  try {
    const { period = 'monthly', year, month, week } = req.query;
    
    let startDate, endDate;
    const currentYear = year ? parseInt(year) : new Date().getFullYear();
    
    if (period === 'monthly') {
      const currentMonth = month ? parseInt(month) - 1 : new Date().getMonth();
      startDate = new Date(currentYear, currentMonth, 1);
      endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);
    } else if (period === 'weekly') {
      const now = new Date();
      const weekStart = week ? new Date(year, 0, (week - 1) * 7 + 1) : new Date(now.setDate(now.getDate() - now.getDay()));
      startDate = new Date(weekStart.setHours(0, 0, 0, 0));
      endDate = new Date(weekStart);
      endDate.setDate(endDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (period === 'yearly') {
      startDate = new Date(currentYear, 0, 1);
      endDate = new Date(currentYear, 11, 31, 23, 59, 59);
    }

    const summary = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      period,
      startDate,
      endDate,
      income: summary.find(s => s._id === 'income')?.total || 0,
      expense: summary.find(s => s._id === 'expense')?.total || 0,
      incomeCount: summary.find(s => s._id === 'income')?.count || 0,
      expenseCount: summary.find(s => s._id === 'expense')?.count || 0
    };

    result.balance = result.income - result.expense;

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get category-wise summary
router.get('/summary/categories', async (req, res) => {
  try {
    const { startDate, endDate, type, division } = req.query;
    
    const matchFilter = {};
    if (startDate || endDate) {
      matchFilter.date = {};
      if (startDate) matchFilter.date.$gte = new Date(startDate);
      if (endDate) matchFilter.date.$lte = new Date(endDate);
    }
    if (type) matchFilter.type = type;
    if (division) matchFilter.division = division;

    const summary = await Transaction.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: {
            category: '$category',
            division: '$division',
            type: '$type'
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
