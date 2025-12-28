import { useEffect, useState } from 'react';
import api from '../api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null); // null or task.id
  const [editTitle, setEditTitle] = useState('');

  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (e) => {
    e?.preventDefault();
    if (!title.trim()) return;
    try {
      await api.post('/tasks', { title: title.trim() });
      setTitle('');
      loadTasks();
    } catch (err) {
      console.error('Failed to add task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      console.error('Failed to delete task');
    }
  };

  const toggleStatus = async (task) => {
    try {
      await api.put(`/tasks/${task.id}`, {
        status: task.status === 'done' ? 'pending' : 'done',
      });
      loadTasks();
    } catch (err) {
      console.error('Failed to update task');
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = async () => {
    if (!editTitle.trim() || editingId === null) {
      cancelEdit();
      return;
    }
    try {
      await api.put(`/tasks/${editingId}`, { title: editTitle.trim() });
      loadTasks();
      cancelEdit();
    } catch (err) {
      console.error('Failed to edit task');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">My Tasks</h2>
            <button
              onClick={logout}
              className="text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              Logout
            </button>
          </div>

          {/* Add Task Form */}
          <form onSubmit={addTask} className="flex gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            >
              Add
            </button>
          </form>

          {/* Task List */}
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No tasks yet. Add one above!</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <input
                    type="checkbox"
                    checked={task.status === 'done'}
                    onChange={() => toggleStatus(task)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                  />

                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      autoFocus
                      className="flex-1 px-3 py-1 border border-indigo-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <span
                      className={`flex-1 cursor-pointer ${
                        task.status === 'done'
                          ? 'line-through text-gray-500'
                          : 'text-gray-800'
                      }`}
                      onClick={() => toggleStatus(task)}
                    >
                      {task.title}
                    </span>
                  )}

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    {editingId !== task.id && (
                      <button
                        onClick={() => startEdit(task)}
                        className="text-gray-500 hover:text-indigo-600 transition"
                        title="Edit"
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 font-medium transition"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}