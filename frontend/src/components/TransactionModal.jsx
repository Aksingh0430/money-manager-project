import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES, DIVISIONS } from '../utils/constants';
import { canEditTransaction, getTimeRemaining } from '../utils/helpers';

const TransactionModal = ({ isOpen, onClose, onSubmit, transaction = null }) => {
  const [activeTab, setActiveTab] = useState('expense');
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    division: 'personal',
    description: '',
    date: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        division: transaction.division,
        description: transaction.description,
        date: new Date(transaction.date).toISOString().slice(0, 16),
      });
      setActiveTab(transaction.type);
    } else {
      setFormData({
        type: activeTab,
        amount: '',
        category: '',
        division: 'personal',
        description: '',
        date: new Date().toISOString().slice(0, 16),
      });
    }
  }, [transaction, isOpen]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({ ...prev, type: tab }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const isEditing = !!transaction;
  const canEdit = !isEditing || canEditTransaction(transaction?.createdAt);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Warning */}
        {isEditing && !canEdit && (
          <div className="px-6 py-3 bg-red-50 border-b border-red-200">
            <p className="text-sm text-red-600">
              This transaction cannot be edited (12-hour window expired)
            </p>
          </div>
        )}

        {isEditing && canEdit && (
          <div className="px-6 py-3 bg-yellow-50 border-b border-yellow-200">
            <p className="text-sm text-yellow-700">
              {getTimeRemaining(transaction.createdAt)}
            </p>
          </div>
        )}

        {/* Tabs */}
        {!isEditing && (
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'income'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('income')}
            >
              Income
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'expense'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange('expense')}
            >
              Expense
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-4">
            {/* Amount */}
            <div>
              <label className="label">Amount *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter amount"
                required
                min="0.01"
                step="0.01"
                disabled={isEditing && !canEdit}
              />
            </div>

            {/* Category */}
            <div>
              <label className="label">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
                disabled={isEditing && !canEdit}
              >
                <option value="">Select category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Division */}
            <div>
              <label className="label">Division *</label>
              <div className="flex gap-4">
                {DIVISIONS.map(div => (
                  <label key={div.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="division"
                      value={div.value}
                      checked={formData.division === div.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-600"
                      disabled={isEditing && !canEdit}
                    />
                    <span className="text-sm font-medium text-gray-700">{div.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="label">Description *</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter description"
                required
                maxLength="200"
                disabled={isEditing && !canEdit}
              />
            </div>

            {/* Date & Time */}
            <div>
              <label className="label">Date & Time *</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
                required
                disabled={isEditing && !canEdit}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 ${
                activeTab === 'income' ? 'btn-success' : 'bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
              }`}
              disabled={isEditing && !canEdit}
            >
              {isEditing ? 'Update' : 'Add'} {activeTab === 'income' ? 'Income' : 'Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
