import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd MMM yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd MMM yyyy, hh:mm a');
};

export const canEditTransaction = (createdAt) => {
  if (!createdAt) return false;
  const created = typeof createdAt === 'string' ? parseISO(createdAt) : createdAt;
  const hoursSinceCreation = (Date.now() - created.getTime()) / (1000 * 60 * 60);
  return hoursSinceCreation <= 12;
};

export const getTimeRemaining = (createdAt) => {
  if (!createdAt) return '';
  const created = typeof createdAt === 'string' ? parseISO(createdAt) : createdAt;
  const hoursSinceCreation = (Date.now() - created.getTime()) / (1000 * 60 * 60);
  const hoursRemaining = Math.max(0, 12 - hoursSinceCreation);
  
  if (hoursRemaining === 0) return 'Edit time expired';
  
  const hours = Math.floor(hoursRemaining);
  const minutes = Math.floor((hoursRemaining - hours) * 60);
  
  return `${hours}h ${minutes}m remaining to edit`;
};
