import api from '../config/api';

export const transactionService = {
  // Get all transactions with filters
  getAll: async (params = {}) => {
    const response = await api.get('/transactions', { params });
    return response.data;
  },

  // Get single transaction
  getById: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  // Create new transaction
  create: async (data) => {
    const response = await api.post('/transactions', data);
    return response.data;
  },

  // Update transaction
  update: async (id, data) => {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
  },

  // Delete transaction
  delete: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },

  // Get period summary
  getSummary: async (params = {}) => {
    const response = await api.get('/transactions/summary/period', { params });
    return response.data;
  },

  // Get category summary
  getCategorySummary: async (params = {}) => {
    const response = await api.get('/transactions/summary/categories', { params });
    return response.data;
  },
};

export const accountService = {
  getAll: async () => {
    const response = await api.get('/accounts');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/accounts', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/accounts/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
  },
};

export const transferService = {
  getAll: async () => {
    const response = await api.get('/transfers');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/transfers', data);
    return response.data;
  },
};
