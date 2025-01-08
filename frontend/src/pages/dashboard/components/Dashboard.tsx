import React, { useState } from 'react';
import { useTaskContext } from '../../../context/TaskContext';
import { format, subDays } from 'date-fns';
import './Dashboard.css';
import Modal from './Modal'; // Import the modal component

const Dashboard: React.FC = () => {
  const { tasks, toggleCompletion } = useTaskContext();
  const dates = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();

  // State for controlling the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleDateClick = (taskId: string, date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const task = tasks.find(task => task.id === taskId);
    const taskIsCompleted = task?.completions.includes(dateStr);

    setSelectedTaskId(taskId);
    setSelectedDate(date);
    setIsCompleted(taskIsCompleted); // Set completion status for the task

    setIsModalOpen(true); // Open the modal when a date is clicked
  };

  const handleConfirm = () => {
    if (selectedTaskId && selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      toggleCompletion(selectedTaskId, dateStr); // Toggle task completion
    }

    // Close the modal after confirming
    setIsModalOpen(false);
    setSelectedTaskId(null);
    setSelectedDate(null);
    setIsCompleted(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal without doing anything
    setSelectedTaskId(null);
    setSelectedDate(null);
    setIsCompleted(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="overflow-x-auto custom-width border-2 border-gray-200 dark:border-gray-700">
        <table className="overflow-x-auto divide-y divide-gray-200 dark:divide-gray-700 ">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Task
              </th>
              {dates.map((date) => (
                <th
                  key={date.toISOString()}
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {format(date, 'dd MMM')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {task.name}
                </td>
                {dates.map((date) => {
                  const dateStr = date.toISOString().split('T')[0];
                  const isCompleted = task.completions.includes(dateStr);
                  return (
                    <td
                      key={dateStr}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                      onClick={() => handleDateClick(task.id, date)}
                    >
                      <div
                        className={`w-6 h-6 rounded cursor-pointer ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedTaskId && selectedDate && (
        <Modal
          message={
            isCompleted
              ? `Are you sure you want to revert the completion on ${format(selectedDate, 'dd MMM yyyy')}?`
              : `Did you complete your task on ${format(selectedDate, 'dd MMM yyyy')}?`
          }
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Dashboard;
