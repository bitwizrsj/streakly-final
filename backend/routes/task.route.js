const express = require('express');
const { Task, User } = require('../models');

const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
    try {
        const { username, name, interval } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found');

        const task = new Task({ name, interval });
        await task.save();
        user.tasks.push(task._id);
        await user.save();

        res.status(201).send(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get a task
router.get('/:taskId', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update task (toggle completion)
router.put('/:taskId', async (req, res) => {
    try {
        const { date } = req.body; // Expects ISO date
        const task = await Task.findById(req.params.taskId);
        if (!task) return res.status(404).send('Task not found');

        const index = task.completions.indexOf(date);
        if (index > -1) {
            task.completions.splice(index, 1); // Remove completion
        } else {
            task.completions.push(date); // Add completion
        }
        await task.save();
        res.send(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a task
router.delete('/:taskId', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
