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
                        className={w-6 h-6 rounded cursor-pointer ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                        }}
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
              ? Are you sure you want to revert the completion on ${format(selectedDate, 'dd MMM yyyy')}?
              : Did you complete your task on ${format(selectedDate, 'dd MMM yyyy')}?
          }
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Dashboard;  import React from 'react';
import { format, subMonths, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

interface ContributionCalendarProps {
  completions: string[];
}

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({ completions }) => {
  const endDate = new Date(); // Current date
  const startDate = subMonths(endDate, 12); // One year ago from the current date

  // Generate all dates within the interval, extending to full weeks for proper alignment
  const allDates = eachDayOfInterval({
    start: startOfWeek(startDate, { weekStartsOn: 0 }),
    end: endOfWeek(endDate, { weekStartsOn: 0 }),
  });

  // Split dates into weeks for display in rows
  const weeks: Date[][] = [];
  for (let i = 0; i < allDates.length; i += 7) {
    weeks.push(allDates.slice(i, i + 7));
  }

  // Check if a date has a completed task
  const getContributionLevel = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    return completions.includes(dateStr);
  };

  // Determine the color of a box based on whether it's completed
  const getContributionColor = (isCompleted: boolean): string => {
    return isCompleted ? 'bg-green-500' : 'bg-gray-100'; // Green for completed, gray for not completed
  };

  // Helper function to display the month name only once per column
  const getMonthName = (week: Date[], columnIndex: number): string | null => {
    const firstDayOfWeek = week[0];
    const isStartOfMonth = firstDayOfWeek.getDate() === 1;
    const isFirstColumn = columnIndex === 0;

    // Show the month name only if it's the first column or start of a new month
    return isStartOfMonth || isFirstColumn ? format(firstDayOfWeek, 'MMM') : null;
  };

  return (
    <div className="h-60 overflow-x-auto dark:bg-gray-700 dark:text-white">
      <div className="inline-block min-w-full">
        {/* Month Names */}
        <div className="flex text-xs text-gray-500 mb-2">
          {weeks[0].map((date, columnIndex) => {
            const isStartOfMonth = date.getDate() === 1; // Check if this is the first day of a month
            return (
              <div key={columnIndex} className="w-6 h-6 text-center">
                {isStartOfMonth ? format(date, 'MMM') : ''}
              </div>
            );
          })}
        </div>

        {/* Calendar Grid */}
        <div className="flex w-full space-x-2">
          {/* Day Labels */}
          <div className="flex flex-col text-xs text-gray-500 mr-2 space-y-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          {/* Contribution Squares */}
          <div className="flex flex-1 gap-1 overflow-x-auto">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((date) => {
                  if (date > endDate) return null; // Skip future dates
                  const isCompleted = getContributionLevel(date);
                  return (
                    <div
                      key={date.toISOString()}
                      className={w-4 h-4 rounded-sm ${getContributionColor(
                        isCompleted
                      )} border}
                      title={${format(date, 'PP')}: ${
                        isCompleted ? 'Completed' : 'No activity'
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end mt-4 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-1 mx-2">
            <div className="w-4 h-4 rounded-sm bg-gray-100 border" />
            <div className="w-4 h-4 rounded-sm bg-green-500 border" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionCalendar;  import React from 'react';
import { useParams } from 'react-router-dom';
import { useTaskContext } from '../../../context/TaskContext';
import ContributionCalendar from './ContributionCalendar';
import './TaskDetails.css';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks } = useTaskContext();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return <div>Task not found</div>;
  }

  const calculateStreak = () => {
    const sortedCompletions = [...task.completions].sort();
    let currentStreak = 0;
    let longestStreak = 0;
    let streak = 0;

    for (let i = 0; i < sortedCompletions.length; i++) {
      const currentDate = new Date(sortedCompletions[i]);
      const prevDate = i > 0 ? new Date(sortedCompletions[i - 1]) : null;
      
      if (!prevDate || 
          (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24) === 1) {
        streak++;
      } else {
        streak = 1;
      }
      
      currentStreak = streak;
      longestStreak = Math.max(longestStreak, streak);
    }

    return { currentStreak, longestStreak };
  };

  const { currentStreak, longestStreak } = calculateStreak();

  return (
    <div className="space-y-8 sm:px-6 lg:px-8 ">
      <div className="bg-white rounded-lg p-6 dark:bg-gray-700 ">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">{task.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-green-200 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Total Completions</h3>
            <p className="text-3xl font-bold">{task.completions.length}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Current Streak</h3>
            <p className="text-3xl font-bold">{currentStreak} days</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Longest Streak</h3>
            <p className="text-3xl font-bold">{longestStreak} days</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg w-full shadow p-6 dark:bg-gray-700 dark:text-white">
        <h3 className="text-lg font-medium mb-4">Activity Calendar</h3>
        <div className="overflow-x-auto  w-[calc(100vw-30rem)] custom-width max-w-[70rem] ">
          <ContributionCalendar completions={task.completions} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;  import React, { useState } from 'react';
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
    navigate(/${username});
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

export default TaskForm;  import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTaskContext } from '../../../context/TaskContext';
import { Pencil, Trash2, Eye } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks, deleteTask } = useTaskContext();
    const { username } = useParams(); 

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
              {/* Eye Icon to View Task Details */}
              <Link
                to={/${username}/task/${task.id}}
                className="p-2 text-green-600 hover:text-green-800"
              >
                <Eye className="w-5 h-5" />
              </Link>
              
              {/* Edit Task Icon */}
              <Link
                to={/task/edit/${task.id}}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <Pencil className="w-5 h-5" />
              </Link>

              {/* Delete Task Icon */}
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

export default TaskList;  import React from 'react';
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
      <aside className="lg:w-64 w-full bg-gray-100 dark:text-white dark:bg-gray-800 shadow-sm h-screen  lg:block hidden overflow-y-auto">
        <nav className="p-4 space-y-6">
          {/* Main navigation */}
          <div className="space-y-2">
            <Link
              to={/${username}}
              className={flex items-center space-x-2 p-2 rounded-lg ${
                isActiveRoute(/${username})
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }}
            >
              <LayoutGrid className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to={/${username}/create}
              className={flex items-center space-x-2 p-2 rounded-lg ${
                isActiveRoute(/${username}/create)
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Create Task</span>
            </Link>
            <Link
              to={/${username}/tasks}
              className={flex items-center space-x-2 p-2 rounded-lg ${
                isActiveRoute(/${username}/tasks)
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }}
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
                  to={/${username}/task/${task.id}}
                  className={block px-2 py-1.5 text-sm rounded ${
                    isActiveRoute(/${username}/task/${task.id})
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }}
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
            to={/${username}}
            className={flex flex-col items-center space-x-1 p-2 ${
              isActiveRoute(/${username})
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            }}
          >
            <LayoutGrid className="w-6 h-6" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link
            to={/${username}/create}
            className={flex flex-col items-center space-x-1 p-2 ${
              isActiveRoute(/${username}/create)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            }}
          >
            <PlusCircle className="w-6 h-6" />
            <span className="text-xs">Create</span>
          </Link>
          <Link
            to={/${username}/tasks}
            className={flex flex-col items-center space-x-1 p-2 ${
              isActiveRoute(/${username}/tasks)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            }}
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