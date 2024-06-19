import { useEffect, useState } from "react";
import { Title } from "../../../components/Title/Title";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { errorHandler } from "../../../utils/errorHandler";
import { api } from "../../../utils/api";
import { Pagination } from "../../../components/Pagination/Pagination";

export function ParkingSpots() {
  const cols = ["Código", "Status", "Tipo"];
  
  const [parkingSpots, setParkingSpots] = useState([]);
  const [totalSpots, setTotalSpots] = useState(0);
  const [availableSpots, setAvailableSpots] = useState(0);
  const [occupiedSpots, setOccupiedSpots] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);

  useEffect(() => {    
    const fetchParkingSpots = async () => {
      try {
        const { data } = await api.get(`/parking-spots?page=${currentPage - 1}&size=5`);

        const formattedData = data.content.map(val => {
          if (val.status === "FREE") {
            val.status = "Livre";
          } else {
            val.status = "Ocupado";
          }
          return val;
        });
        
        if (currentPage === 1) {
          const { data } = await api.get(`/parking-spots`);

          const formattedData = data.content.map(val => {
            if (val.status === "FREE") {
              val.status = "Livre";
            } else {
              val.status = "Ocupado";
            }
            return val;
          });
          
          setTotalSpots(formattedData.length);
          setAvailableSpots(formattedData.filter(val => val.status === "Livre").length);
          setOccupiedSpots(formattedData.filter(val => val.status === "Ocupado").length);
        }

        setParkingSpots(formattedData);

        currentPage === 1 && 
          setTotalPages(Array.from({ length: data.totalPages }, (_v, i) => i + 1));

      } catch (e) {
        errorHandler("Ocorreu um erro ao recuperar os dados");
      }
    }

    fetchParkingSpots();
  }, [currentPage])

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Title title="Vagas de carro"/>
        <Link to="new" type="button" className="text-md font-bold flex items-center bg-blue-700 py-1 px-2 gap-2 rounded-sm hover:opacity-75 transition-all">
          <LuPlus />
          <span>Criar novo</span>
        </Link>
      </div>

      <div className="mb-4">
        <p>Total de Vagas: {totalSpots}</p>
        <p>Vagas Disponíveis: {availableSpots}</p>
        <p>Vagas Ocupadas: {occupiedSpots}</p>
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
            {parkingSpots && parkingSpots.map(p => {
              return (
                <tr key={p.id} className="first:border-t border-b border-my-gray-700 text-md">
                  <td className="px-4 py-4">{p.code}</td>
                  <td className="px-4 py-4">{p.status}</td>
                  <td className="px-4 py-4">{p.type}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </>
  )
}