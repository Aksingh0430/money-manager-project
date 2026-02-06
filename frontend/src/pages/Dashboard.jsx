import React, { useState, useEffect } from 'react';
import { useTransactions } from '../context/TransactionContext';
import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import FilterPanel from '../components/FilterPanel';
import TransactionList from '../components/TransactionList';
import CategoryChart from '../components/CategoryChart';
import TransactionModal from '../components/TransactionModal';
import FloatingActionButton from '../components/FloatingActionButton';

const Dashboard = () => {
  const {
    transactions,
    loading,
    filters,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateFilters,
    clearFilters,
  } = useTransactions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSubmitTransaction = async (data) => {
    if (selectedTransaction) {
      await updateTransaction(selectedTransaction._id, data);
    } else {
      await addTransaction(data);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <SummaryCards />

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFilterChange={updateFilters}
          onClearFilters={clearFilters}
        />

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Category Chart */}
          <CategoryChart filters={filters} />

          {/* Transaction List */}
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
              loading={loading}
            />
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleAddTransaction} />

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitTransaction}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Dashboard;
