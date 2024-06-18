import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { AdminRoutes } from "./AdminRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { useAuth } from "./context/AuthContext";

export function MyRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {user && user.role ? (
        user.role === 'ADMIN' ? (
          <Route path="/*" element={<AdminRoutes />} />
        ) : (
          <Route path="/*" element={<ClientRoutes />} />
        )
      ) : (
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  );
}