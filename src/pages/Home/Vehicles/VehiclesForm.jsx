import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { errorHandler } from "../../../utils/errorHandler";
import { Title } from "../../../components/Title/Title";
import { Input } from "../../../components/Input/Input";
import { useAuth } from "../../../context/AuthContext";

export function VehiclesForm() { // Corrigi o nome da função para FinancesForm
  const [value, setValue] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const parsedValue = parseFloat(value); // Parsing the value to a float

    try {
      if (!value || isNaN(parsedValue)) {
        throw new Error("Digite um valor válido!");
      }

      await api.patch(
        `/balance/${parsedValue.toFixed(2)}`, // Passing the parsed value
        null, // No body content
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/home");
    } catch (err) {
      errorHandler(err);
    }
  }

  function handleCancel() {
    navigate("/home");
  }

  return (
    <>
      <Title title="Adicionar saldo" />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-x-4 gap-y-2"
      >
        <Input
          type="text"
          name="value"
          placeholder="Digite o valor a ser adicionado"
          content="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)} // Ensure the value is updated
        />

        <button
          type="submit"
          className="text-sm bg-blue-600 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold"
        >
          Salvar
        </button>
        <button
          type="button"
          className="text-sm bg-my-gray-500 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </form>
    </>
  );
}
