import { useEffect, useState } from "react"
import { errorHandler } from "../../../utils/errorHandler";
import { api } from "../../../utils/api";

export function Parking() {
  const [parking, setParking] = useState([])
  const cols = ["Placa do carro", "Marca", "Modelo", "Cor", "Valor", "Desconto", "Entrada", "Saída"];

  useEffect(() => {
    const fetchParking = async () => {
      try {
        const { data } = await api.get("/parking");
        setParking(data.content)
      } catch (e) {
        errorHandler("Ocorreu um erro ao recuperar os dados");
      }
    }

    fetchParking();
  }, [])

  return (
    <div className="flex justify-around items-center">
    <table className="w-[100%]">
      <thead>
        <tr>
          {cols.map(t => (
            <th className="px-4 py-2 text-left text-my-gray-500 text-md">{t}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {parking && parking.map(p => {
          return (
            <tr key={p.receipt} className="first:border-t border-b border-my-gray-700 text-md">
              <td className="px-4 py-4">{p.carInfoLicensePlate}</td>
              <td className="px-4 py-4">{p.carInfoCarBrand}</td>
              <td className="px-4 py-4">{p.carInfoCarModel}</td>
              <td className="px-4 py-4">{p.carInfoCarColor}</td>
              <td className="px-4 py-4">{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(p.value)}</td>
              <td className="px-4 py-4">{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(p.discount)}</td>
              <td className="px-4 py-4">{p.entryDate}</td>
              <td className="px-4 py-4">{p.endDate}</td>
            </tr>
          )
        })}
        </tbody>
    </table>
  </div>
  )
}