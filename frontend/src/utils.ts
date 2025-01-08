// src/utils.ts

/**
 * Calculates the current and longest streak of task completions.
 * @param completions - Array of completion dates in string format.
 * @returns An object containing the current streak and the longest streak.
 */
export const calculateStreak = (completions: string[]) => {
    const sortedCompletions = [...completions].sort();
    let currentStreak = 0;
    let longestStreak = 0;
    let streak = 0;
  
    for (let i = 0; i < sortedCompletions.length; i++) {
      const currentDate = new Date(sortedCompletions[i]);
      const prevDate = i > 0 ? new Date(sortedCompletions[i - 1]) : null;
  
      if (
        !prevDate ||
        (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24) === 1
      ) {
        streak++;
      } else {
        streak = 1;
      }
  
      currentStreak = streak;
      longestStreak = Math.max(longestStreak, streak);
    }
  
    return { currentStreak, longestStreak };
  };
  
  /**
   * Determines whether a specific date has a completed task.
   * @param completions - Array of completion dates in string format.
   * @param date - The date to check.
   * @returns True if the task is completed on the given date, false otherwise.
   */
  export const getContributionLevel = (completions: string[], date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    return completions.includes(dateStr);
  };
  