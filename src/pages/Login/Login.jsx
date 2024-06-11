import { useState } from "react"
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setToken } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!username || !password) {
      alert("Preencha os dados corretamente.")
    }

    const body = { username, password }

    const { data } = await api.post("http://localhost:8080/api/v1/auth", body)
    const { token } = data;

    console.log(token);

    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);

    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="flex items-center justify-center col-span- rounded-md h-[100vh]">
      <form onSubmit={handleSubmit} className="p-12 bg-my-gray-800 rounded-md">
        <Input type="email" name="username" placeholder="Digite seu e-mail" content="E-mail"  state={username} setState={setUsername}/>
        <Input type="password" name="password" placeholder="Digite sua senha" content="Senha"  state={password} setState={setPassword}/>
        <button type="submit" className="text-sm bg-blue-600 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold">Enviar</button>
        <p className="text-my-gray-600 mt-4">Não tem uma conta? <Link to="/register" className="underline"> Crie uma clicando aqui</Link></p>
      </form>
    </div>
  )
}