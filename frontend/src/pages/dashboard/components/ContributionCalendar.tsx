// src/components/ContributionCalendar.tsx
import React from 'react';
import { format, subMonths, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { getContributionLevel } from '../../../utils'; // Import the utility function

interface ContributionCalendarProps {
  completions: string[];
}

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({ completions }) => {
  const endDate = new Date();
  const startDate = subMonths(endDate, 12);

  const allDates = eachDayOfInterval({
    start: startOfWeek(startDate, { weekStartsOn: 0 }),
    end: endOfWeek(endDate, { weekStartsOn: 0 }),
  });

  const weeks: Date[][] = [];
  for (let i = 0; i < allDates.length; i += 7) {
    weeks.push(allDates.slice(i, i + 7));
  }

  const getContributionColor = (isCompleted: boolean): string => {
    return isCompleted ? 'bg-green-500' : 'bg-gray-100';
  };

  return (
    <div className="h-60 overflow-x-auto dark:bg-gray-700 dark:text-white">
      <div className="inline-block min-w-full">
        <div className="flex w-full space-x-2">
          <div className="flex flex-col text-xs text-gray-500 mr-2 space-y-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="flex flex-1 gap-1 overflow-x-auto">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((date) => {
                  if (date > endDate) return null;
                  const isCompleted = getContributionLevel(completions, date); // Use utility function
                  return (
                    <div
                      key={date.toISOString()}
                      className={`w-4 h-4 rounded-sm ${getContributionColor(isCompleted)} border`}
                      title={`${format(date, 'PP')}: ${isCompleted ? 'Completed' : 'No activity'}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionCalendar;
