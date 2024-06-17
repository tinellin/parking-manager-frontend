import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import { AdminRoutes } from './AdminRoutes';
import { ClientRoutes } from './ClientRoutes';
import { Login } from './pages/Login/Login';

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {user ? (
          user.role === 'ADMIN' ? (
            <Route path="/*" element={<AdminRoutes />} />
          ) : (
            <Route path="/*" element={<ClientRoutes />} />
          )
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}