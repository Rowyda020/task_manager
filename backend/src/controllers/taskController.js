const db = require('../models/db');


exports.createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, user_id)
    VALUES (?, ?, ?)
  `);

  stmt.run(title, description || null, req.user.id);

  res.status(201).json({ message: 'Task created' });
};


exports.getTasks = (req, res) => {
  const tasks = db.prepare(`
    SELECT * FROM tasks
    WHERE user_id = ?
    ORDER BY created_at DESC
  `).all(req.user.id);

  res.json(tasks);
};


exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = db.prepare(`
    SELECT * FROM tasks WHERE id = ? AND user_id = ?
  `).get(id, req.user.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  db.prepare(`
    UPDATE tasks
    SET title = ?, description = ?, status = ?
    WHERE id = ?
  `).run(
    title || task.title,
    description || task.description,
    status || task.status,
    id
  );

  res.json({ message: 'Task updated' });
};


exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const task = db.prepare(`
    SELECT * FROM tasks WHERE id = ? AND user_id = ?
  `).get(id, req.user.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  db.prepare(`DELETE FROM tasks WHERE id = ?`).run(id);

  res.json({ message: 'Task deleted' });
};
