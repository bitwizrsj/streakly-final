import React from 'react';
import { format, eachDayOfInterval, subMonths, getMonth } from 'date-fns';

interface ContributionCalendarProps {
  completions: string[];
}

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({ completions }) => {
  const endDate = new Date();
  const startDate = subMonths(endDate, 12);
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  // Group dates by month
  const monthlyData = dates.reduce((acc, date) => {
    const monthKey = format(date, 'MMM');
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(date);
    return acc;
  }, {} as Record<string, Date[]>);

  const getContributionLevel = (date: Date): number => {
    const dateStr = date.toISOString().split('T')[0];
    if (!completions.includes(dateStr)) return 0;
    return 4; // Maximum intensity for completed days
  };

  const getContributionColor = (level: number): string => {
    const colors = [
      'bg-gray-100',
      'bg-green-100',
      'bg-green-300',
      'bg-green-500',
      'bg-green-700'
    ];
    return colors[level];
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Month labels */}
        <div className="flex text-xs text-gray-500 mb-2">
          <div className="w-8" /> {/* Spacer for day labels */}
          {Object.keys(monthlyData).map((month) => (
            <div key={month} className="flex-1 text-center">
              {month}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col text-xs text-gray-500 mr-2 space-y-2">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Contribution squares */}
          <div className="flex flex-1">
            {Object.values(monthlyData).map((days, monthIndex) => (
              <div key={monthIndex} className="flex-1 flex gap-1">
                {Array.from({ length: 7 }).map((_, dayOfWeek) => (
                  <div key={dayOfWeek} className="flex flex-col gap-1">
                    {days
                      .filter((date) => date.getDay() === dayOfWeek)
                      .map((date) => {
                        const level = getContributionLevel(date);
                        return (
                          <div
                            key={date.toISOString()}
                            className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                            title={`${format(date, 'PP')}: ${level ? 'Completed' : 'No activity'}`}
                          />
                        );
                      })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end mt-4 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-1 mx-2">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionCalendar;