import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      if (!token) {
        return;
      }

      try {
        api.defaults.headers.common["Authorization"] = "Bearer " + token;
        const { data } = await api.get("/users/details");
        setUser(data);

        if (data.role === "ADMIN") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      } catch (e) {
        delete api.defaults.headers["Authorization"];
        localStorage.removeItem("token");
        setToken(null);
        navigate("/", { replace: true });
      }
    }

    getUserDetails();
  }, [token]);

  const logout = () => {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };