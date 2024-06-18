import { useState } from "react";
import { Input } from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

export function RegisterCustomer() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [occupation, setOccupation] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();
  const { token } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !cpf || !occupation || !birthday) {
      alert("Preencha todos os dados corretamente.");
      return;
    }

    api.post(
      "/customers",
      { name, cpf, occupation, birthday },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/home");
  }

  return (
    <div className="flex items-center justify-center col-span- rounded-md h-[100vh]">
      <form
        onSubmit={handleSubmit}
        className="p-12 bg-my-gray-800 rounded-md w-[400px]"
      >
        <Input
          type="name"
          name="name"
          placeholder="Digite seu nome"
          content="Nome"
          value={name}
          setState={setName}
        />
        <Input
          type="cpf"
          name="cpf"
          placeholder="Digite seu cpf"
          content="CPF"
          value={cpf}
          setState={setCpf}
        />
        <Input
          type="occupation"
          name="occupation"
          placeholder="Digite seu trabalho"
          content="Trabalho"
          value={occupation}
          setState={setOccupation}
        />
        <Input
          type="birthday"
          name="birthday"
          placeholder="Digite sua data de nascimento"
          content="Data de nascimento"
          value={birthday}
          setState={setBirthday}
        />
        <button
          type="submit"
          className="text-sm bg-blue-600 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
