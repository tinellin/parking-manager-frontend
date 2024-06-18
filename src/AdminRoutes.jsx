import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import { Parking } from "./pages/Dashboard/Parking/Parking";
import { Employees } from './pages/Dashboard/Employee/Employees';
import { EmployeeForm } from './pages/Dashboard/Employee/EmployeeForm';
import { Customers } from './pages/Dashboard/Customer/Customers';
import { ParkingSpots } from './pages/Dashboard/ParkingSpot/ParkingSpots';
import { ParkingSpotForm } from './pages/Dashboard/ParkingSpot/ParkingSpotForm';
import { LayoutAdmin } from './pages/Dashboard/index';

export function AdminRoutes() {
  const { user } = useAuth();
  
  if (user.role !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route element={<LayoutAdmin />}>
        <Route path="/dashboard" element={<Parking />} />
        <Route path="/dashboard/employees" element={<Employees />} />
        <Route path="/dashboard/employees/new" element={<EmployeeForm />} />
        <Route path="/dashboard/customers" element={<Customers />} />
        <Route path="/dashboard/parking-spots" element={<ParkingSpots />} />
        <Route path="/dashboard/parking-spots/new" element={<ParkingSpotForm />} />
      </Route>
    </Routes>
  );
}