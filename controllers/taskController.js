const Task = require('../models/Task');

// Create task
// POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      user: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get all tasks of a logged user
// GET /api/tasks
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get a task by ID (Never used, but I did it)
// GET /api/tasks/:id
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Update a task (And I use this just for a toggle button XD)
// PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;
    
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Delete a task
// DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (error) {
    next(error);
  }
};
