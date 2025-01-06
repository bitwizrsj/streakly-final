import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);  // Expecting userData to be returned
      alert('Login successful!');
      onClose(); // Close the modal
  
      if (userData?.username) {
        navigate(`/${userData.username}`);  // Navigate using the username
      } else {
        alert('User data does not have a valid username.');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium dark:text-gray-200">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium dark:text-gray-200">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Log in'}
      </button>

      <div className="text-sm text-center">
        <span className="text-gray-500">Don't have an account? </span>
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
