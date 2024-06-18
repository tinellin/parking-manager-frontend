import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { errorHandler } from "../../../utils/errorHandler";
import { Title } from "../../../components/Title/Title";
import { Input } from "../../../components/Input/Input";
import { useAuth } from "../../../context/AuthContext";

export function FinancesForm() {
  const [value, setValue] = useState(""); // Renomeado `code` para `value`
  const { token } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = { value: parseFloat(value) }; // Enviar o valor como um número

    try {
      if (!value || isNaN(data.value)) {
        throw new Error("Digite um valor válido!");
      }

      await api.patch(
        `/customers/balance/${data.value.toFixed(2)}`, // Convertendo para string com 2 casas decimais
        null, // Colocamos `null` para o primeiro argumento
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Enviar para o endpoint correto

      navigate("/home"); // Navegar para o dashboard após sucesso
    } catch (err) {
      errorHandler(err); // Lidar com erros da maneira apropriada
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
          state={value}
          setState={setValue}
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
