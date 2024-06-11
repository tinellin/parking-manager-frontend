import { useState } from "react";
import { Input } from "../../components/Input/Input";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if(!username || password || confirmPassword) {
      alert("Preencha todos os dados corretamente.")
      return;
    }

    fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      body: JSON.stringify({ username, password, confirmPassword }),
      headers: {
        "Content-Type": "application/json"
      },
    })
  }

  return (
    <div className="flex items-center justify-center col-span- rounded-md h-[100vh]">
    <form onSubmit={handleSubmit} className="p-12 bg-my-gray-800 rounded-md">
      <Input type="email" name="username" placeholder="Digite seu e-mail" content="E-mail"  value={username} setState={setUsername}/>
      <Input type="password" name="password" placeholder="Digite sua senha" content="Senha"  value={password} setState={setPassword}/>
      <Input type="password" name="password" placeholder="Confirme sua senha" content="Senha"  value={confirmPassword} setState={setConfirmPassword}/>
      <button type="submit" className="text-sm bg-blue-600 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold">Enviar</button>
    </form>
  </div>
  )
}