import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setToken, user, loadingUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      alert("Preencha os dados corretamente.");
      return;
    }

    setLoading(true);

    try {
      const body = { username, password };
      const { data } = await api.post("/auth", body);
      const { token } = data;

      localStorage.setItem("token", JSON.stringify(token));
      setToken(token);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loadingUser && user && user.role) {
      if (user.role === "ADMIN") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [loadingUser, user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-12 bg-gray-800 rounded-md">
        <Input
          type="email"
          name="username"
          placeholder="Digite seu e-mail"
          content="E-mail"
          state={username}
          setState={setUsername}
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          content="Senha"
          state={password}
          setState={setPassword}
        />
        <button
          type="submit"
          className="text-sm bg-blue-600 p-2 w-full rounded-sm hover:opacity-85 transition-all font-bold"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Enviar"}
        </button>
        <p className="text-gray-600 mt-4">
          Não tem uma conta?{" "}
          <Link to="/register" className="underline">
            Crie uma clicando aqui
          </Link>
        </p>
      </form>
    </div>
  );
}
