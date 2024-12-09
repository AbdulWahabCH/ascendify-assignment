const express = require('express');
const Task = require('../models/Task');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// GET all tasks with pagination (public)
// /api/tasks?page=2&limit=8
router.get('/', async (req, res) => {
    const { page = 1, limit = 8 } = req.query;

    try {
        const startIndex = (page - 1) * limit; // Like skip 0 - 8 - 16 - 24 etc

        const tasks = await Task.find()
            .skip(parseInt(startIndex)) // Skip the previous pages
            .limit(parseInt(limit)) // Limit the number of results
            .sort({ createdAt: -1 }); // Sort by most recent

        // total documents in the current collection.
        // this is not necassary but ad-hoc
        const total = await Task.countDocuments();

        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            tasks, // i can also populate the users but it is not necessary
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST a new task (requires authentication)
// /api/tasks 
router.post('/', protect, async (req, res) => {
    const { title, description, completed } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            completed,
            user: req.user._id,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET task by ID (requires authentication)
// /api/tasks/2 
router.get('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// DELETE task by ID (requires authentication)
// /api/tasks/3
router.delete('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await task.remove();
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PUT (update) task by ID (requires authentication)
// /api/tasks/2
router.put('/:id', protect, async (req, res) => {
    const { title, description, completed } = req.body;

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PATCH task by ID (requires authentication)
// /api/tasks/2
router.patch('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        Object.keys(req.body).forEach((key) => {
            task[key] = req.body[key];
        });

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
