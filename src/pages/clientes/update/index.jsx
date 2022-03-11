/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../clientes.css";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/pt-BR";

import { toast } from "react-toastify";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

import {
  Container,
  GenderContainer,
  GenderContainerType,
  CPFContainer,
} from "./styles";

function UpdateCliente() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  // const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pesquisaCpf, setPesquisaCpf] = useState(false);
  const [email, setEmail] = useState("");

  registerLocale("es", es);
  let navigate = useNavigate();

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

  const handleUpdateCliente = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        console.log(birthDate);
        const obg = {
          nome: name,
          cpf,
          data_nascimento:
            birthDate.getFullYear() +
            "-" +
            (birthDate.getMonth() + 1) +
            "-" +
            birthDate.getDate(),
          sexo: gender,
          email,
          id_beneficios: 1,
        };
        console.log(obg);

        const response = await api.put(`clientes/${cpf}/`, obg);

        console.log(response);
        toast.success("Cliente cadastrado com sucesso!");
        navigate(`/clientes`);
      } catch (error) {
        toast.error("Erro no casdastro do cliente!");
        console.log("erro");
        console.log(error);
      }
    },
    [name, cpf, birthDate, gender, navigate, email]
  );

  return (
    <div className="clientes">
      <CPFContainer onSubmit={handlePesquisaCPF}>
        <h2>Alterar Cliente</h2>
        <div>
          <input
            type="number"
            placeholder="Digite o número do CPF"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            required
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CPFContainer>
      {pesquisaCpf && (
        <Container onSubmit={handleUpdateCliente}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Telefone"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <DatePicker
            locale="es"
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Data de Nascimento"
          />
          <GenderContainer>
            <GenderContainerType>
              <label htmlFor="sexo_masc">Masculino</label>
              <input
                id="sexo_masc"
                type="radio"
                name="sexo"
                checked={gender === "M"}
                value="M"
                onChange={(event) => setGender(event.target.value)}
              />
            </GenderContainerType>
            <GenderContainerType>
              <label htmlFor="sexo_fem">Feminino</label>
              <input
                type="radio"
                id="sexo_fem"
                name="sexo"
                checked={gender === "F"}
                value="F"
                onChange={(event) => setGender(event.target.value)}
              />
            </GenderContainerType>
          </GenderContainer>

          <button type="submit">Alterar</button>
        </Container>
      )}
    </div>
  );
}

export default UpdateCliente;
