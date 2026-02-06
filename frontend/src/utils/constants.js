export const CATEGORIES = [
  { value: 'fuel', label: 'Fuel', icon: '⛽' },
  { value: 'movie', label: 'Movie', icon: '🎬' },
  { value: 'food', label: 'Food', icon: '🍔' },
  { value: 'loan', label: 'Loan', icon: '💰' },
  { value: 'medical', label: 'Medical', icon: '🏥' },
  { value: 'salary', label: 'Salary', icon: '💵' },
  { value: 'business', label: 'Business', icon: '💼' },
  { value: 'investment', label: 'Investment', icon: '📈' },
  { value: 'gift', label: 'Gift', icon: '🎁' },
  { value: 'other', label: 'Other', icon: '📝' },
];

export const DIVISIONS = [
  { value: 'personal', label: 'Personal' },
  { value: 'office', label: 'Office' },
];

export const TRANSACTION_TYPES = [
  { value: 'income', label: 'Income', color: 'green' },
  { value: 'expense', label: 'Expense', color: 'red' },
];

export const PERIODS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

export const ACCOUNT_TYPES = [
  { value: 'cash', label: 'Cash' },
  { value: 'bank', label: 'Bank Account' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'digital_wallet', label: 'Digital Wallet' },
];

export const getCategoryIcon = (category) => {
  const cat = CATEGORIES.find(c => c.value === category);
  return cat ? cat.icon : '📝';
};

export const getCategoryLabel = (category) => {
  const cat = CATEGORIES.find(c => c.value === category);
  return cat ? cat.label : category;
};
