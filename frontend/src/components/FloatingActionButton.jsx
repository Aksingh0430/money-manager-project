import React from 'react';
import { Plus } from 'lucide-react';

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-40 group"
      aria-label="Add transaction"
    >
      <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
    </button>
  );
};

export default FloatingActionButton;
