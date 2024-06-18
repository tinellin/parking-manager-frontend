import { useEffect, useState } from "react";
import { Title } from "../../../components/Title/Title";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { errorHandler } from "../../../utils/errorHandler";
import { api } from "../../../utils/api";

export function Finances() {
  const cols = ["Nome", "CPF", "Ocupação", "Saldo"];
  
  const [details, setDetails] = useState({
    name: "",
    cpf: "",
    occupation: "",
    balance: 0,
    car: []
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get("/customers/details");
        setDetails(response.data);
      } catch (e) {
        errorHandler("Ocorreu um erro ao recuperar os dados");
      }
    }

    fetchDetails();
  }, [])

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Title title="Detalhes da conta"/>
        <Link to="adicionar-saldo" type="button" className="text-md font-bold flex items-center bg-blue-700 py-1 px-2 gap-2 rounded-sm hover:opacity-75 transition-all">
          <LuPlus />
          <span>Adicionar saldo</span>
        </Link>
      </div>

      <div className="flex justify-around items-center">
        <table className="w-[100%]">
          <thead>
            <tr>
              {cols.map((t, idx) => (
                <th key={idx} className="px-4 py-2 text-left text-my-gray-500 text-md">{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">{details.name}</td>
              <td className="px-4 py-2">{details.cpf}</td>
              <td className="px-4 py-2">{details.occupation}</td>
              <td className="px-4 py-2">{details.balance.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
