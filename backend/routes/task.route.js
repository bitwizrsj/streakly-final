import express from 'express';  // Use ES module import syntax
const router = express.Router();
import { createTask, getTasks, getTask, deleteTask, toggleCompletion } from '../controller/task.controller.js';  // Importing functions
import  authenticate  from '../middleware/auth.middleware.js';  // Assuming you have an auth middleware

// Create a task
router.post('/tasks', authenticate, createTask);

// Get all tasks for the authenticated user
router.get('/tasks', authenticate, getTasks);

// Get a specific task by ID
router.get('/tasks/:id', authenticate, getTask);

// Delete a task
router.delete('/tasks/:id', authenticate, deleteTask);

// Toggle task completion
router.post('/tasks/completion', authenticate, toggleCompletion);

export default router;  // Exporting the router using ES module export syntax
