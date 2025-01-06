import React from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../../../context/TaskContext';
import { Pencil, Trash2 } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks, deleteTask } = useTaskContext();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">All Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="text-lg font-medium">{task.name}</h3>
              <p className="text-sm text-gray-500">{task.category}</p>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/task/${task.id}`}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <Pencil className="w-5 h-5" />
              </Link>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;