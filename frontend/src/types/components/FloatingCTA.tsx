import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingCTA = () => {
  return (
    <button 
      className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2 z-50"
      onClick={() => window.location.href = '#contact'}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden md:inline">Need Help?</span>
    </button>
  );
};

export default FloatingCTA;