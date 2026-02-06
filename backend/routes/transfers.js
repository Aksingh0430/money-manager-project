const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Transfer = require('../models/Transfer');
const Account = require('../models/Account');

// Validation middleware
const transferValidation = [
  body('fromAccount').notEmpty().withMessage('From account is required'),
  body('toAccount').notEmpty().withMessage('To account is required'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('description').optional().isLength({ max: 200 })
];

// Get all transfers
router.get('/', async (req, res) => {
  try {
    const transfers = await Transfer.find()
      .sort({ date: -1 })
      .populate('fromAccount', 'name')
      .populate('toAccount', 'name');

    res.json({ success: true, data: transfers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new transfer
router.post('/', transferValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fromAccount, toAccount, amount } = req.body;

    // Check if accounts exist
    const fromAcc = await Account.findById(fromAccount);
    const toAcc = await Account.findById(toAccount);

    if (!fromAcc || !toAcc) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    // Check if accounts are different
    if (fromAccount === toAccount) {
      return res.status(400).json({ success: false, message: 'Cannot transfer to the same account' });
    }

    // Check sufficient balance
    if (fromAcc.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    // Create transfer
    const transfer = new Transfer(req.body);
    await transfer.save();

    // Update account balances
    fromAcc.balance -= amount;
    toAcc.balance += amount;
    
    await fromAcc.save();
    await toAcc.save();

    await transfer.populate('fromAccount toAccount', 'name');

    res.status(201).json({ success: true, data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
