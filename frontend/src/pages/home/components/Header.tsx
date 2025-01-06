import React, { useState } from 'react';
import { Menu, X, BarChart } from 'lucide-react';
import Modal from '../../../components/UI/Modal';
import LoginForm from '../../../components/Auth/LoginForm';
import SignupForm from '../../../components/Auth/SignupForm';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Login modal state
  const [isSignupOpen, setIsSignupOpen] = useState(false); // Signup modal state

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">Streakly</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-indigo-600">Home</a>
            <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-indigo-600">Contact</a>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Log in
              </button>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-600 hover:text-indigo-600">Home</a>
              <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-indigo-600">Contact</a>
              {/* You can add more mobile-specific items here */}
            </div>
          </div>
        )}
      </nav>

      {/* Modals for Login and Signup */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Welcome back">
        <LoginForm 
          onClose={() => setIsLoginOpen(false)} 
          onSwitchToSignup={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(true);
          }} 
        />
      </Modal>

      <Modal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} title="Create your account">
        <SignupForm 
          onClose={() => setIsSignupOpen(false)} 
          onSwitchToLogin={() => {
            setIsSignupOpen(false);
            setIsLoginOpen(true);
          }} 
        />
      </Modal>
    </header>
  );
};

export default Header;
