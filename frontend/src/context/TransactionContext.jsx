import React, { createContext, useContext, useState, useCallback } from 'react';
import { transactionService } from '../services/api';
import toast from 'react-hot-toast';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    division: '',
    category: '',
    startDate: '',
    endDate: '',
  });

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.type) params.type = filters.type;
      if (filters.division) params.division = filters.division;
      if (filters.category) params.category = filters.category;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;

      const response = await transactionService.getAll(params);
      setTransactions(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const addTransaction = async (data) => {
    try {
      await transactionService.create(data);
      toast.success('Transaction added successfully');
      fetchTransactions();
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const updateTransaction = async (id, data) => {
    try {
      await transactionService.update(id, data);
      toast.success('Transaction updated successfully');
      fetchTransactions();
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await transactionService.delete(id);
      toast.success('Transaction deleted successfully');
      fetchTransactions();
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      division: '',
      category: '',
      startDate: '',
      endDate: '',
    });
  };

  const value = {
    transactions,
    loading,
    filters,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateFilters,
    clearFilters,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
