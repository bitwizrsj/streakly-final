import Task from '../models/task.models.js';  // Use ES module import syntax

// Create a new task
const createTask = async (req, res) => {
  try {
    const { name, interval } = req.body;
    const userId = req.user._id; // Assuming JWT authentication sets `req.user`

    const newTask = new Task({ name, interval, userId });
    await newTask.save();

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(400).json({ message: 'Error creating task', error });
  }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching tasks', error });
  }
};

// Get a single task by ID
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching task', error });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: 'Error deleting task', error });
  }
};

// Toggle completion (add/remove)
const toggleCompletion = async (req, res) => {
  try {
    const { taskId, date } = req.body; // Expecting taskId and date as body
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Add or remove the completion date
    const isCompleted = task.completions.includes(date);
    if (isCompleted) {
      task.completions = task.completions.filter(completion => completion !== date);
    } else {
      task.completions.push(date);
    }

    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: 'Error updating completion', error });
  }
};

// Export the functions using ES module export
export {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  toggleCompletion,
};
