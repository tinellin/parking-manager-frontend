import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function getUserDetails() {
      if (!token) {
        setLoadingUser(false);
        return;
      }

      try {
        api.defaults.headers.common["Authorization"] = "Bearer " + token;
        const { data } = await api.get("/users/details");
        setUser(data);
      } catch (e) {
        delete api.defaults.headers["Authorization"];
        localStorage.removeItem("token");
        <Navigate to="/"/>;
      } finally {
        setLoadingUser(false);
      }
    }

    getUserDetails();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };