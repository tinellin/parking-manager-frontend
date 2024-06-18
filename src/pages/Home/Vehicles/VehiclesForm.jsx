import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { errorHandler } from "../../../utils/errorHandler";
import { Title } from "../../../components/Title/Title";
import { Input } from "../../../components/Input/Input";
import { useAuth } from "../../../context/AuthContext";


export function VehiclesForm() {
  const [licensePlate, setLicensePlate] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = {
        licensePlate,
        carBrand,
        carModel,
        carColor,
      };

      await api.post(`/customers/cars`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/home/vehicles");
    } catch (err) {
      errorHandler(err);
    }
  }

  function handleCancel() {
    navigate("/home/vehicles");
  }

  return (
    <>
      <Title title="Adicionar veículo" />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-x-4 gap-y-2"
      >
        <Input
          type="text"
          name="licensePlate"
          placeholder="Digite a placa"
          content="Placa"
          state={licensePlate}
          setState={setLicensePlate}
        />
        <Input
          type="text"
          name="carBrand"
          placeholder="Digite a marca"
          content="Marca"
          state={carBrand}
          setState={setCarBrand}
        />
        <Input
          type="text"
          name="carModel"
          placeholder="Digite o modelo"
          content="Modelo"
          state={carModel}
          setState={setCarModel}
        />
        <Input
          type="text"
          name="carColor"
          placeholder="Digite a cor do veículo"
          content="Cor"
          state={carColor}
          setState={setCarColor}
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
