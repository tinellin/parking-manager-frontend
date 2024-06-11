import { useState } from "react";
import { Input } from "../../../components/Input/Input";
import { useNavigate } from "react-router-dom";

import { api } from ".././../../utils/api";
import { Title } from "../../../components/Title/Title";
import { errorHandler } from "../../../utils/errorHandler";

export function ParkingSpotForm() {
  const [code, setCode] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

    const data = { code, type: type.toUpperCase().trim() }

    try {
      if (!type || !code) {
        throw new Error("Preencha os dados corretamente!")
      }
  
      await api.post("/parking-spots", data);
  
      return navigate("/dashboard/parking-spots")
    } catch (err) {
      const { response } = err;
      errorHandler(response.data.message)
    }
  }

  function handleCancel() {
    navigate("/dashboard/parking-spots");
  }

  return (
    <>
      <Title title="Cadastrar nova vaga de carro"/>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4 gap-y-2">
        <Input type="text" name="code" placeholder="Digite o código da vaga" content="Código"  state={code} setState={setCode}/>
        <Input type="text" name="type" placeholder="Digite o tipo da vaga" content="Tipo" state={type} setState={setType}/>

        <button type="button" className="text-sm bg-my-gray-500 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold" onClick={handleCancel}>Cancelar</button>
        <button type="submit" className="text-sm bg-blue-600 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold">Salvar</button>
      </form>
    </>
  )
}