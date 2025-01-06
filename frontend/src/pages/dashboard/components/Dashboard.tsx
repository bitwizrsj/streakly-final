import React from 'react';
import { useTaskContext } from '../../../context/TaskContext';
import { format, subDays } from 'date-fns';

const Dashboard: React.FC = () => {
  const { tasks, toggleCompletion } = useTaskContext();
  const dates = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              {dates.map((date) => (
                <th
                  key={date.toISOString()}
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {format(date, 'dd MMM')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {task.name}
                </td>
                {dates.map((date) => {
                  const dateStr = date.toISOString().split('T')[0];
                  const isCompleted = task.completions.includes(dateStr);
                  return (
                    <td
                      key={dateStr}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      onClick={() => toggleCompletion(task.id, dateStr)}
                    >
                      <div
                        className={`w-6 h-6 rounded cursor-pointer ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200'
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
      
      {/* Mobile view for individual task entries */}
      <div className="block sm:hidden mt-4 ">
        {tasks.map((task) => (
          <div key={task.id} className="border-b pb-4 mb-4">
            <h3 className="font-semibold text-lg">{task.name}</h3>
            <div className="grid grid-cols-3 gap-2">
              {dates.map((date) => {
                const dateStr = date.toISOString().split('T')[0];
                const isCompleted = task.completions.includes(dateStr);
                return (
                  <div
                    key={dateStr}
                    className={`w-8 h-8 rounded cursor-pointer ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                    onClick={() => toggleCompletion(task.id, dateStr)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
