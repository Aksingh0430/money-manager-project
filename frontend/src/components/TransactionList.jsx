import React from 'react';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { formatCurrency, formatDateTime, canEditTransaction } from '../utils/helpers';
import { getCategoryIcon, getCategoryLabel } from '../utils/constants';

const TransactionList = ({ transactions, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-gray-400 mb-2">
          <Calendar className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No transactions found</h3>
        <p className="text-gray-500">Start by adding your first transaction</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h3>
      <div className="space-y-3">
        {transactions.map((transaction) => {
          const isIncome = transaction.type === 'income';
          const canEdit = canEditTransaction(transaction.createdAt);

          return (
            <div
              key={transaction._id}
              className={`p-4 rounded-lg border-l-4 ${
                isIncome
                  ? 'bg-green-50 border-green-500'
                  : 'bg-red-50 border-red-500'
              } hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{getCategoryIcon(transaction.category)}</span>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {transaction.description}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="font-medium">{getCategoryLabel(transaction.category)}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span className="capitalize">{transaction.division}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{formatDateTime(transaction.date)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${
                      isIncome ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      disabled={!canEdit}
                      className={`p-2 rounded-lg transition-colors ${
                        canEdit
                          ? 'hover:bg-gray-200 text-gray-600'
                          : 'text-gray-300 cursor-not-allowed'
                      }`}
                      title={canEdit ? 'Edit transaction' : 'Cannot edit after 12 hours'}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(transaction._id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;
