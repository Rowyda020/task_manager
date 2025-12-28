import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          isAuthenticated() ? <Tasks /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}
