/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../clientes.css";

import { toast } from "react-toastify";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

import { Container, CPFContainer } from "./styles";

function PesquisarCliente() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  // const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pesquisaCpf, setPesquisaCpf] = useState(false);
  const [email, setEmail] = useState("");

  const handlePesquisaCPF = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        console.log(birthDate);
        const obg = {
          cpf,
        };
        console.log(obg);

        const response = await api.get(`clientes/${cpf}`);

        console.log(response);
        const cliente = response.data;

        setName(cliente.nome);
        setBirthDate(new Date(cliente.data_nascimento));
        setGender(cliente.sexo);
        setEmail(cliente.email);

        setPesquisaCpf(true);
      } catch (error) {
        toast.error("CPF não encontrado!");
        console.log("erro");
        console.log(error);
        setPesquisaCpf(false);
      }
    },
    [cpf, birthDate]
  );

  return (
    <div className="clientes">
      <CPFContainer onSubmit={handlePesquisaCPF}>
        <h2>Pesquisar Cliente</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o número do CPF"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            required
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CPFContainer>
      {pesquisaCpf && (
        <Container>
          <div>
            <p>Nome: </p>
            <p>{name}</p>
          </div>
          <div>
            <p>CPF: </p>
            <p>{cpf}</p>
          </div>
          <div>
            <p>Telefone: </p>
            <p>Tel Cliente</p>
          </div>
          <div>
            <p>E-mail: </p>
            <p>{email}</p>
          </div>
          <div>
            <p>Sexo: </p>
            <p>{gender === "F" ? "Feminino" : "Masculino"}</p>
          </div>
        </Container>
      )}
    </div>
  );
}

export default PesquisarCliente;
