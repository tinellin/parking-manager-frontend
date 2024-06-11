import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("token")));
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserDetails() {
      if (!token) return;

      console.log(token);

      try {
        api.defaults.headers.common["Authorization"] = "Bearer " + token;

        // user:
        const { data } = await api.get("/users/details");
        setUser(data);
      } catch (e) {
        delete api.defaults.headers["Authorization"];
        localStorage.removeItem("token");
        <Navigate to="/"/>
      }
    }

    getUserDetails();
  }, [token])

  return (
    <AuthContext.Provider value={ {  token, setToken, user } }>
      { children }
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };