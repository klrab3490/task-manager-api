const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Add a new task
router.post('/tasks', async (req, res) => {
    try {
        // Whitelist allowed fields
        const { title, description, status, dueDate } = req.body;
        if (!title || typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
        }
        const task = new Task({
            title: title.trim(),
            description: description ? description.trim() : undefined,
            status,
            dueDate
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a task by ID
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a task by ID
router.put('/tasks/:id', async (req, res) => {
    try {
        // Whitelist allowed fields
        const { title, description, status, dueDate } = req.body;
        const update = {};
        if (title !== undefined) {
            if (typeof title !== 'string' || !title.trim()) {
                return res.status(400).json({ error: 'Title must be a non-empty string.' });
            }
            update.title = title.trim();
        }
        if (description !== undefined) update.description = description.trim();
        if (status !== undefined) update.status = status;
        if (dueDate !== undefined) update.dueDate = dueDate;

        const task = await Task.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get tasks by status
 * GET /tasks/status/:status
 * Example: /tasks/status/pending
 */
router.get('/tasks/status/:status', async (req, res) => {
    try {
        const allowedStatuses = ['pending', 'in-progress', 'completed'];
        const { status } = req.params;
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value.' });
        }
        const tasks = await Task.find({ status });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;