import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Title } from "../../../components/Title/Title";
import { errorHandler } from "../../../utils/errorHandler";

export function Employees() {
  const cols = ["Nome", "Função", "Entrada", "Saída"];
  
  const [employees, setEmployees] = useState([]);

  useEffect(() => {    
    const fetchEmployees = async () => {
      try {
        const { data } = await api.get("/employees");
        setEmployees(data)
        console.log(data);
      } catch (e) {
        errorHandler("Ocorreu um erro ao recuperar os dados");
      }
    }

    fetchEmployees();
  }, [])


  return (
    <>
      <div className="flex items-center justify-between mb-4">
      <Title title="Funcionários"/>
        <Link to="new" type="button" className="text-md font-bold flex items-center bg-blue-700 py-1 px-2 gap-2 rounded-sm hover:opacity-75 transition-all">
          <LuPlus />
          <span>Criar novo</span>
        </Link>
      </div>

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
          {employees && employees.map(e => {
            return (
              <tr key={e.id} className="first:border-t border-b border-my-gray-700 text-md">
                <td className="px-4 py-4">{e.name}</td>
                <td className="px-4 py-4">{e.role}</td>
                <td className="px-4 py-4">{e.entryTime}</td>
                <td className="px-4 py-4">{e.departureTime}</td>
              </tr>
            )
          })}
          </tbody>
      </table>
    </div>
    </>
  )
}