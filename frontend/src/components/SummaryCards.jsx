import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react';
import { transactionService } from '../services/api';
import { formatCurrency } from '../utils/helpers';
import { PERIODS } from '../utils/constants';

const SummaryCards = () => {
  const [period, setPeriod] = useState('monthly');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, [period]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await transactionService.getSummary({ period });
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="card animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-6">
      {/* Period Selector */}
      <div className="flex items-center gap-4 mb-4">
        <Calendar className="w-5 h-5 text-gray-600" />
        <div className="flex gap-2">
          {PERIODS.map(p => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                period === p.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">Total Income</p>
              <h3 className="text-3xl font-bold text-green-700">
                {formatCurrency(summary?.income || 0)}
              </h3>
              <p className="text-sm text-green-600 mt-2">
                {summary?.incomeCount || 0} transactions
              </p>
            </div>
            <div className="p-3 bg-green-200 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>

        {/* Expense Card */}
        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 mb-1">Total Expense</p>
              <h3 className="text-3xl font-bold text-red-700">
                {formatCurrency(summary?.expense || 0)}
              </h3>
              <p className="text-sm text-red-600 mt-2">
                {summary?.expenseCount || 0} transactions
              </p>
            </div>
            <div className="p-3 bg-red-200 rounded-xl">
              <TrendingDown className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className={`card bg-gradient-to-br ${
          (summary?.balance || 0) >= 0 
            ? 'from-blue-50 to-blue-100 border-blue-200' 
            : 'from-orange-50 to-orange-100 border-orange-200'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${
                (summary?.balance || 0) >= 0 ? 'text-blue-600' : 'text-orange-600'
              }`}>
                Balance
              </p>
              <h3 className={`text-3xl font-bold ${
                (summary?.balance || 0) >= 0 ? 'text-blue-700' : 'text-orange-700'
              }`}>
                {formatCurrency(summary?.balance || 0)}
              </h3>
              <p className={`text-sm mt-2 ${
                (summary?.balance || 0) >= 0 ? 'text-blue-600' : 'text-orange-600'
              }`}>
                {(summary?.balance || 0) >= 0 ? 'Surplus' : 'Deficit'}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${
              (summary?.balance || 0) >= 0 ? 'bg-blue-200' : 'bg-orange-200'
            }`}>
              <Wallet className={`w-6 h-6 ${
                (summary?.balance || 0) >= 0 ? 'text-blue-700' : 'text-orange-700'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
