const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Account = require('../models/Account');

// Validation middleware
const accountValidation = [
  body('name').notEmpty().withMessage('Account name is required'),
  body('type').optional().isIn(['cash', 'bank', 'credit_card', 'digital_wallet'])
];

// Get all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find().sort({ createdAt: -1 });
    res.json({ success: true, data: accounts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single account
router.get('/:id', async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    res.json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new account
router.post('/', accountValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const account = new Account(req.body);
    await account.save();

    res.status(201).json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update account
router.put('/:id', accountValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const account = await Account.findById(req.params.id);
    
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    Object.assign(account, req.body);
    account.updatedAt = Date.now();
    
    await account.save();

    res.json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete account
router.delete('/:id', async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    await account.deleteOne();

    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
