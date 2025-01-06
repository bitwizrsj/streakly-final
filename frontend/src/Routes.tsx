import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/components/Dashboard';
import TaskForm from './pages/dashboard/components/TaskForm';
import TaskList from './pages/dashboard/components/TaskList';
import TaskDetails from './pages/dashboard/components/TaskDetails';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<TaskForm />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;