import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Title } from "../../../components/Title/Title";
import { errorHandler } from "../../../utils/errorHandler";

export function Customers() {
  const cols = ["E-mail", "Nome", "Ocupação", "CPF"];
  
  const [customers, setCustomers] = useState([]);

  useEffect(() => {    
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get("/customers");
        setCustomers(data.content)
      } catch (e) {
        errorHandler("Ocorreu um erro ao recuperar os dados");
      }
    }

    fetchCustomers();
  }, [])


  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Title title="Clientes"/>
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
            {customers && customers.map(c => {
              return (
                <tr key={c.id} className="first:border-t border-b border-my-gray-700 text-md">
                  <td className="px-4 py-4">{c.username}</td>
                  <td className="px-4 py-4">{c.name}</td>
                  <td className="px-4 py-4">{c.occupation}</td>
                  <td className="px-4 py-4">{c.cpf}</td>
                </tr>
              )
            })}
          </tbody>
      </table>
    </div>
    </>
  )
}