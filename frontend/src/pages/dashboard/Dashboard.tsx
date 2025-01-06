import React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import TaskSidebar from './components/TaskSidebar';
import Navbar from './components/Navbar';
import Dash from './components/Dashboard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';

const Dashboard: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Navbar />
      <div className="flex "> {/* Add pt-16 to account for fixed navbar */}
        <TaskSidebar />
        <main className="flex-1 ml-0 md:ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dash />} />
            <Route path="/create" element={<TaskForm />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="*" element={<Navigate to={`/${username}`} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
