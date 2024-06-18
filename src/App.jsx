import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import "./styles/global.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyRoutes } from './MyRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <MyRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App;