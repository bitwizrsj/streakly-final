import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completions'>) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
  toggleCompletion: (taskId: string, date: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'completions'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      completions: [],
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const toggleCompletion = (taskId: string, date: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const completions = task.completions.includes(date)
          ? task.completions.filter(d => d !== date)
          : [...task.completions, date];
        return { ...task, completions };
      }
      return task;
    }));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask, toggleCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};