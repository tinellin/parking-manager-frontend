import { AuthProvider } from './context/AuthContext'

import { AdminRoutes } from "./AdminRoutes";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "./styles/global.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />}/>
        </Routes>
        <AdminRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
