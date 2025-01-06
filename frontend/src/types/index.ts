export interface Task {
  id: string;
  name: string;
  category: string;
  completions: string[]; // Array of dates in ISO format
}

export interface TaskCompletion {
  date: string;
  completed: boolean;
}

export interface TaskStats {
  totalCompletions: number;
  currentStreak: number;
  longestStreak: number;
}