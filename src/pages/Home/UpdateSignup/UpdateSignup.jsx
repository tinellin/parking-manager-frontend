import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Input } from "../../../components/Input/Input";
import { api } from "../../../utils/api";
import { Title } from "../../../components/Title/Title";

export function UpdateSignup() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();
  const { token, user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!password || !newPassword || !confirmNewPassword) {
      alert("Preencha todos os dados corretamente.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("As senhas novas não são iguais.");
      return;
    }

    try {
      await api.patch(
        `/users/${user.id}`,
        {
          password,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/home");
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      alert("Ocorreu um erro ao atualizar a senha. Tente novamente.");
    }
  }

  return (
    <>
      <Title title="Atualizar senha"/>

      <form
        onSubmit={handleSubmit}
        className="p-12 bg-my-gray-800 rounded-md w-[400px]"
      >
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha antiga"
          content="Senha atual"
          value={password}
          setState={setPassword}
        />
        <Input
          type="password"
          name="newPassword"
          placeholder="Digite sua nova senha"
          content="Nova senha"
          value={newPassword}
          setState={setNewPassword}
        />
        <Input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirme sua nova senha"
          content="Confirme a nova senha"
          value={confirmNewPassword}
          setState={setConfirmNewPassword}
        />
        <button
          type="submit"
          className="text-sm bg-blue-600 p-2 w-[100%] rounded-sm hover:opacity-85 transition-all font-bold"
        >
          Enviar
        </button>
      </form>
    </>
  );
}
