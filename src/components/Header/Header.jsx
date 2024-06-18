import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/api";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-[10vh] flex items-center justify-between">
      <div className="flex flex-col justify-center items-center">
        <div>
          <h2 className="text-lg text-blue-600 font-bold opacity-75">
            Gerenciador
          </h2>
          <h1 className="text-xl text-my-gray-100 font-bold">de Estacionamento</h1>
        </div>
      </div>

      <div>
        <h3>{user.username}</h3>
        <button onClick={logout} className="text-sm bg-red-600 p-2 rounded-sm hover:opacity-85 transition-all font-bold">
          Logout
        </button>
      </div>
    </header>
  )
}