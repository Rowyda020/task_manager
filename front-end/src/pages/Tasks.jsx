import { useEffect, useState } from 'react';
import api from '../api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

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
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await api.post('/tasks', {
        title: title.trim(),
        description: description.trim(),
      });
      setTitle('');
      setDescription('');
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
    setEditDescription(task.description || '');
  };

  const saveEdit = async () => {
    if (!editTitle.trim() || editingId === null) {
      cancelEdit();
      return;
    }
    try {
      await api.put(`/tasks/${editingId}`, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      loadTasks();
      cancelEdit();
    } catch (err) {
      console.error('Failed to edit task');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
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

          
          <form onSubmit={addTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details, notes, or steps..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Add Task
            </button>
          </form>

        
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No tasks yet. Create one above!</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={task.status === 'done'}
                      onChange={() => toggleStatus(task)}
                      className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                    />

                    <div className="flex-1">
                      {editingId === task.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            autoFocus
                            className="w-full px-3 py-2 border border-indigo-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Description..."
                            className="w-full px-3 py-2 border border-indigo-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            rows="3"
                          />
                          <div className="flex gap-2">
                            <button onClick={saveEdit} className="text-green-600 hover:text-green-800">
                              Save
                            </button>
                            <button onClick={cancelEdit} className="text-gray-600 hover:text-gray-800">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span
                            className={`block text-lg font-medium cursor-pointer ${
                              task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900'
                            }`}
                            onClick={() => toggleStatus(task)}
                          >
                            {task.title}
                          </span>
                          {task.description && (
                            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                              {task.description}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                      {editingId !== task.id && (
                        <button
                          onClick={() => startEdit(task)}
                          className="text-gray-500 hover:text-indigo-600"
                          title="Edit"
                        >
                          ✏️
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
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