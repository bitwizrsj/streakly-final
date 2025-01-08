import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Combined imports
import { useTaskContext } from '../../../context/TaskContext';

const TaskForm: React.FC = () => {
  const { username } = useParams(); // Extract username from URL
  const [name, setName] = useState('');
  const [interval, setInterval] = useState('1 day'); // Default is 1 day
  const [customInterval, setCustomInterval] = useState(''); // To store manual interval input
  const { addTask } = useTaskContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If a custom interval is provided, use it, otherwise use the selected option
    const finalInterval = customInterval || interval;

    // Add the task to the context
    addTask({ name, interval: finalInterval });

    // Redirect to the username's dashboard
    navigate(`/${username}`);
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedInterval = e.target.value;
    setInterval(selectedInterval);
    if (selectedInterval !== 'Custom') {
      setCustomInterval(''); // Clear custom interval if a preset option is selected
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Task for {username}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Task Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          
          </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
