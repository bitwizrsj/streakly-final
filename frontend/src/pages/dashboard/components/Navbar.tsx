import React, { useState } from 'react';
import { Menu, Sun, Moon, Github } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext'; 
import Modal from '../../../components/UI/Modal';
import LoginForm from '../../../components/Auth/LoginForm';
import SignupForm from '../../../components/Auth/SignupForm';
import ProfileDropdown from '../../../components/UI/ProfileDropdown';
import { useParams } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { username } = useParams();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <nav className="bg-green-400 shadow-sm dark:bg-green-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Streakly</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-gray-200" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>
              
              {user ? (
                <ProfileDropdown email={user.email} onLogout={logout} />
              ) : (
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-bold">Welcome, {username}!</h3>
                </div>
              )}
            </div>

            {/* Mobile Menu or Profile */}
            <div className="sm:hidden flex items-center">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-gray-200" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>
              {user ? (
                <ProfileDropdown email={user.email} onLogout={logout} />
              ) : (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Menu className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && !user && (
          <div className="sm:hidden bg-white dark:bg-gray-800 pb-4">
            <div className="px-4 space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              
              {!user ? (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="w-full p-2 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Sign up
                  </button>
                </>
              ) : null}
            </div>
          </div>
        )}
      </nav>

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Welcome back">
        <LoginForm onClose={() => setIsLoginOpen(false)} onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }} />
      </Modal>

      <Modal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} title="Create your account">
        <SignupForm onClose={() => setIsSignupOpen(false)} onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }} />
      </Modal>
    </>
  );
};

export default Navbar;
