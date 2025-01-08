import React from 'react';
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
                      className={`w-4 h-4 rounded-sm ${getContributionColor(
                        isCompleted
                      )} border`}
                      title={`${format(date, 'PP')}: ${
                        isCompleted ? 'Completed' : 'No activity'
                      }`}
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

export default ContributionCalendar;
