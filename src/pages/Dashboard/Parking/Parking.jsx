import { useEffect, useState } from "react";
import { errorHandler } from "../../../utils/errorHandler";
import { api } from "../../../utils/api";

export function Parking() {
  const [parking, setParking] = useState([]);
  const [lucro, setLucro] = useState(0); // Estado para armazenar o lucro
  const cols = [
    "Placa do carro",
    "Marca",
    "Modelo",
    "Cor",
    "Valor",
    "Desconto",
    "Entrada",
    "Saída",
  ];

  useEffect(() => {
    const fetchParking = async () => {
      try {
        const { data } = await api.get("/parking");
        setParking(data.content);

        // Calculando o lucro reduzido pelos descontos
        const totalLucro = data.content.reduce(
          (acc, curr) => acc + curr.value - curr.discount,
          0
        );
        setLucro(totalLucro);
      } catch (e) {
        errorHandler("Ocorreu um erro ao recuperar os dados");
      }
    };

    fetchParking();
  }, []);

  return (
    <div className="flex flex-col justify-around items-center">
      <div className="mt-4 text-xl font-bold">
        Lucro Total:{" "}
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(lucro)}
      </div>
      <table className="w-[100%]">
        <thead>
          <tr>
            {cols.map((t) => (
              <th
                key={t}
                className="px-4 py-2 text-left text-my-gray-500 text-md"
              >
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parking &&
            parking.map((p) => (
              <tr
                key={p.receipt}
                className="first:border-t border-b border-my-gray-700 text-md"
              >
                <td className="px-4 py-4">{p.carInfoLicensePlate}</td>
                <td className="px-4 py-4">{p.carInfoCarBrand}</td>
                <td className="px-4 py-4">{p.carInfoCarModel}</td>
                <td className="px-4 py-4">{p.carInfoCarColor}</td>
                <td className="px-4 py-4">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(p.value)}
                </td>
                <td className="px-4 py-4">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(p.discount)}
                </td>
                <td className="px-4 py-4">{p.entryDate}</td>
                <td className="px-4 py-4">{p.endDate}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
