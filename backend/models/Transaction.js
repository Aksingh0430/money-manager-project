const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['fuel', 'movie', 'food', 'loan', 'medical', 'salary', 'business', 'investment', 'gift', 'other']
  },
  division: {
    type: String,
    required: true,
    enum: ['office', 'personal']
  },
  description: {
    type: String,
    required: true,
    maxlength: 200
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for faster queries
transactionSchema.index({ date: -1 });
transactionSchema.index({ type: 1, division: 1 });

// Method to check if transaction can be edited (within 12 hours)
transactionSchema.methods.canEdit = function() {
  const hoursSinceCreation = (Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60);
  return hoursSinceCreation <= 12;
};

module.exports = mongoose.model('Transaction', transactionSchema);
