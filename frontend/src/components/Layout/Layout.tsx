import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/components/Dashboard';
import Home from '../../pages/home/Home';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  // Redirect unauthenticated users to home
  useEffect(() => {
    console.log('Layout user:', user);
    if (!user) {
      navigate('/');
    } else if (user.username !== username) {
      navigate(`/${user.username}`);
    }
  }, [user, username, navigate]);
  
  

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {user ? <Dashboard /> : <Home />}
      <Outlet />
    </div>
  );
};

export default Layout;
