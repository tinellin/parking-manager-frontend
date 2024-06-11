import { useState } from "react";
import { Input } from "../../../components/Input/Input";
import { useNavigate } from "react-router-dom";

import { api } from ".././../../utils/api";
import { Title } from "../../../components/Title/Title";
import { errorHandler } from "../../../utils/errorHandler";

export function EmployeeForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthday, setBirthday] = useState("");
  const [role, setRole] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

    const data = {
      name,
      cpf,
      birthday,
      role,
      entryTime,
      departureTime
    }

    console.log(data);

    try {
      if (!name || !cpf || !birthday || !role || !entryTime || !departureTime) {
        throw new Error("Preencha os dados corretamente!")
      }
  
      await api.post("/employees", data);
  
      return navigate("/dashboard/employees")
    } catch (err) {
      errorHandler(err.message)
    }
  }

  function handleCancel() {
    console.log("dasdasdasads");
    navigate("/dashboard/employees");
  }

  return (
    <>
      <Title title={"Cadastrar novo funcionário"}/>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4 gap-y-2">
        <Input type="text" name="name" placeholder="Digite o nome" content="Nome"  state={name} setState={setName}/>
        <Input type="text" name="cpf" placeholder="Digite o CPF" content="cpf" state={cpf} setState={setCpf}/>
        <Input type="text" name="birthday" placeholder="Digite a data de nascimento (YYYY-MM-DD)" content="Data de nascimento" state={birthday} setState={setBirthday}/>
        <Input type="text" name="role" placeholder="Digite a função" content="Função" state={role} setState={setRole}/>
        <Input type="text" name="entryTime" placeholder="Digite a hora de entrada (HH:MM)" content="Hora de entrada" state={entryTime} setState={setEntryTime}/>
        <Input type="text" name="departureTime" placeholder="Digite a hora de saída (HH:MM)" content="Hora de saída" state={departureTime} setState={setDepartureTime}/>

        <button type="button" className="text-sm bg-my-gray-500 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold" onClick={handleCancel}>Cancelar</button>
        <button type="submit" className="text-sm bg-blue-600 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold">Salvar</button>
      </form>
    </>
  )
}