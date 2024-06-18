import { useEffect, useState } from "react";
import { Title } from "../../../components/Title/Title";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { errorHandler } from "../../../utils/errorHandler";
import { api } from "../../../utils/api";

export function Vehicles() {
  const cols = ["Marca", "Modelo", "Cor"];
  
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get("/customers/cars");
        setDetails(response.data); // Assumindo que o endpoint retorna uma lista de carros
      } catch (e) {
        errorHandler("Ocorreu um erro ao recuperar os dados");
      }
    }

    fetchDetails();
  }, [])

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Title title="Veículos"/>
        <Link to="adicionar-veiculo" type="button" className="text-md font-bold flex items-center bg-blue-700 py-1 px-2 gap-2 rounded-sm hover:opacity-75 transition-all">
          <LuPlus />
          <span>Adicionar veículo</span>
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
            {details.map((car, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{car.carBrand}</td>
                <td className="px-4 py-2">{car.carModel}</td>
                <td className="px-4 py-2">{car.carColor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
