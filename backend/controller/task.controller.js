const Task = require('../models/taskModel');

// Create a new task
const createTask = async (req, res) => {
  const { name, interval } = req.body;

  try {
    const task = new Task({
      name,
      interval,
      user: req.user.id, // From middleware
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

module.exports = { createTask, getTasks };
