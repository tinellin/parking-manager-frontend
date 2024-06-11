import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Header } from './components/Header/Header';
import { Sidebar } from "./components/Sidebar/Sidebar";

import { Employees } from './pages/Dashboard/Employee/Employees';
import { EmployeeForm } from './pages/Dashboard/Employee/EmployeeForm';
import { Customers } from './pages/Dashboard/Customer/Customers';
import { ParkingSpots } from './pages/Dashboard/ParkingSpot/ParkingSpots';
import { ParkingSpotForm } from './pages/Dashboard/ParkingSpot/ParkingSpotForm';

export function AdminRoutes() {
  const { user } = useAuth();

  return (
    <>
      { user.role === 'ADMIN' &&
        (
          <>
          <Header />
          <div className="max-w-[1480px] grid grid-cols-6">
            <Sidebar />
            <main className="bg-my-gray-800 rounded-md p-5 border col-span-5">
              <Routes>
                <Route path="/dashboard" element={user.role === "ADMIN" ? <Dashboard /> : <Navigate to="/login"/>} />
                <Route path="/dashboard/employees" element={user.role === "ADMIN" ? <Employees /> : <Navigate to="/login"/>} />
                <Route path="/dashboard/employees/new" element={user.role === "ADMIN" ? <EmployeeForm /> : <Navigate to="/login"/>} />
                <Route path="/dashboard/customers" element={user.role === "ADMIN" ? <Customers /> : <Navigate to="/login"/>} />
                <Route path="/dashboard/parking-spots" element={user.role === "ADMIN" ? <ParkingSpots /> : <Navigate to="/login"/>} />
                <Route path="/dashboard/parking-spots/new" element={user.role === "ADMIN" ? <ParkingSpotForm /> : <Navigate to="/login"/>} />
              </Routes>
            </main>
          </div>
          </>
        )      
      }
    </>
  )
}