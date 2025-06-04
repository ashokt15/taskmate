// taskmate/server/controllers/taskController.js
const Task = require('../models/Task');

/**
 * @desc Get all tasks for the authenticated user
 * @route GET /api/tasks
 * @access Private
 */
const getTasks = async (req, res) => {
  try {
    // Find all tasks belonging to the authenticated user (req.user.id is set by authMiddleware)
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
};

/**
 * @desc Create a new task
 * @route POST /api/tasks
 * @access Private
 */
const createTask = async (req, res) => {
  const { title, description, tags, dueDate, priority, status } = req.body;

  // Basic validation: title is required
  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  try {
    // Create a new task instance
    const task = new Task({
      user: req.user.id, // Assign the task to the authenticated user
      title,
      description,
      tags,
      dueDate: dueDate ? new Date(dueDate) : null, // Convert dueDate to Date object if provided
      priority,
      status,
    });

    // Save the task to the database
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    // Handle validation errors from Mongoose schema
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error creating task' });
  }
};

/**
 * @desc Update an existing task
 * @route PUT /api/tasks/:id
 * @access Private
 */
const updateTask = async (req, res) => {
  const { title, description, tags, dueDate, priority, status } = req.body;

  try {
    // Find the task by ID and ensure it belongs to the authenticated user
    let task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    // Update task fields
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.tags = tags !== undefined ? tags : task.tags;
    task.dueDate = dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : task.dueDate;
    task.priority = priority || task.priority;

    // Handle status change and update completedAt timestamp
    if (status !== undefined && task.status !== status) {
      task.status = status;
      if (status === 'Completed') {
        task.completedAt = new Date();
      } else {
        task.completedAt = null; // Clear completedAt if status changes from Completed
      }
    } else {
      task.status = status || task.status;
    }

    // Save the updated task
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating task' });
  }
};

/**
 * @desc Delete a task
 * @route DELETE /api/tasks/:id
 * @access Private
 */
const deleteTask = async (req, res) => {
  try {
    // Find and delete the task by ID, ensuring it belongs to the authenticated user
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting task' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
