import { useState } from "react";
import { Input } from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if(!username || !password || !confirmPassword) {
      alert("Preencha todos os dados corretamente.")
      return;
    }

    api.post("/users", { username, password, confirmPassword })
    
    navigate("/")
  }

  return (
    <div className="flex items-center justify-center col-span- rounded-md h-[100vh]">
    <form onSubmit={handleSubmit} className="p-12 bg-my-gray-800 rounded-md w-[400px]">
      <Input type="email" name="username" placeholder="Digite seu e-mail" content="E-mail"  value={username} setState={setUsername}/>
      <Input type="password" name="password" placeholder="Digite sua senha" content="Senha"  value={password} setState={setPassword}/>
      <Input type="password" name="password" placeholder="Digite a confirmação de senha" content="Confirme sua senha"  value={confirmPassword} setState={setConfirmPassword}/>
      <button type="submit" className="text-sm bg-blue-600 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold">Enviar</button>
    </form>
  </div>
  )
}
