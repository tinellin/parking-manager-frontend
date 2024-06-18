import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import { Home } from "./pages/Home/Home/Home";
import { RegisterCustomer } from "./pages/Register/RegisterCustomer";
import { LayoutClient } from './pages/Home/index';

export function ClientRoutes() {
  const { user } = useAuth();

  if (user.role !== 'CLIENT') {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route element={<LayoutClient />}>
        <Route path="/home" element={<Home />} />
        <Route path="/create-customer" element={<RegisterCustomer />} />
        {/* Outras rotas do cliente */}
      </Route>
    </Routes>
  );
}