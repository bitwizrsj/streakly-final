import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

// User Interface for type checking
interface User {
  username: string;
  email: string;
  id: string; // You can add more fields as required, like avatar, roles, etc.
}

// AuthContextType Interface
interface AuthContextType {
  user: User | null;
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<User | null>;
  signupWithGoogle: () => void;
  signupWithGithub: () => void;
  isLoading: boolean;
  logout: () => void;
}

// Create Context with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Props for AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Component that provides AuthContext value
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in on app load, fetch user from localStorage
  useEffect(() => {
    const restoreUser = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
  
      console.log('Restoring user...', { storedToken, storedUser });
  
      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          console.log('User restored:', parsedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing/restoring user:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        console.log('No user found in localStorage');
        setUser(null);
      }
    };
  
    restoreUser();
  }, []);
  
  

  // Signup function
  const signup = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3001/api/auth/signup', {
        username,
        email,
        password,
      });
      console.log('Signup successful:', response.data);
      // Optionally handle the redirect or auto-login here
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); // Store user object
        setUser(user);
        console.log('Login successful:', response.data);
        return user;
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Google signup function (OAuth)
  const signupWithGoogle = () => {
    console.log('Signup with Google');
    // Implement Google OAuth logic here
    // For example, redirect to Google OAuth or handle response if using a package
  };

  // GitHub signup function (OAuth)
  const signupWithGithub = () => {
    console.log('Signup with GitHub');
    // Implement GitHub OAuth logic here
    // For example, redirect to GitHub OAuth or handle response if using a package
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, signupWithGoogle, signupWithGithub, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
