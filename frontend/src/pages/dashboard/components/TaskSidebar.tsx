import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { LayoutGrid, PlusCircle, ListTodo } from 'lucide-react';
import { useTaskContext } from '../../../context/TaskContext';

const TaskSidebar = () => {
  const { tasks } = useTaskContext();
  const location = useLocation();
  const { username } = useParams(); // Get the username from the URL

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <>
      {/* Sidebar for larger screens */}
      <aside className="lg:w-64 w-full bg-white dark:bg-gray-800 shadow-sm h-[calc(100vh-4rem)] fixed lg:block hidden overflow-y-auto">
        <nav className="p-4 space-y-6">
          {/* Main navigation */}
          <div className="space-y-2">
            <Link
              to={`/${username}`}
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isActiveRoute(`/${username}`)
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to={`/${username}/create`}
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isActiveRoute(`/${username}/create`)
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Create Task</span>
            </Link>
            <Link
              to={`/${username}/tasks`}
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                isActiveRoute(`/${username}/tasks`)
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ListTodo className="w-5 h-5" />
              <span>All Tasks</span>
            </Link>
          </div>

          {/* All tasks list */}
          <div className="space-y-4">
            <div className="mt-2 space-y-1">
              {tasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/${username}/task/${task.id}`}
                  className={`block px-2 py-1.5 text-sm rounded ${
                    isActiveRoute(`/${username}/task/${task.id}`)
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {task.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Bottom navigation for smaller screens */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md">
        <div className="flex justify-around p-2 space-x-4">
          <Link
            to={`/${username}`}
            className={`flex flex-col items-center space-x-1 p-2 ${
              isActiveRoute(`/${username}`)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <LayoutGrid className="w-6 h-6" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link
            to={`/${username}/create`}
            className={`flex flex-col items-center space-x-1 p-2 ${
              isActiveRoute(`/${username}/create`)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <PlusCircle className="w-6 h-6" />
            <span className="text-xs">Create</span>
          </Link>
          <Link
            to={`/${username}/tasks`}
            className={`flex flex-col items-center space-x-1 p-2 ${
              isActiveRoute(`/${username}/tasks`)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <ListTodo className="w-6 h-6" />
            <span className="text-xs">Tasks</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TaskSidebar;
