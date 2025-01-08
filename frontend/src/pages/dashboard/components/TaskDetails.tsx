import React from 'react';
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

export default TaskDetails;
