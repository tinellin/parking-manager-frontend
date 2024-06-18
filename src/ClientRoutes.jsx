import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import { RegisterCustomer } from "./pages/Register/RegisterCustomer";
import { LayoutClient } from './pages/Home/index';
import { Finances } from './pages/Home/Finances/Finances';
import { Vehicles } from './pages/Home/Vehicles/Vehicles';
import { UpdateSignup } from './pages/Home/UpdateSignup/UpdateSignup';

export function ClientRoutes() {
  const { user } = useAuth();

  if (user.role !== 'CLIENT') {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route element={<LayoutClient />}>
        <Route path="/home" element={<Finances />} />
        <Route path="/home/vehicles" element={<Vehicles />} />
        <Route path="/home/update-signup" element={<UpdateSignup />} />
        <Route path="/create-customer" element={<RegisterCustomer />} />
        {/* Outras rotas do cliente */}
      </Route>
    </Routes>
  );
}