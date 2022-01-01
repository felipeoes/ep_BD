/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../clientes.css";

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/pt-BR';

import { Container, GenderContainer, GenderContainerType, CPFContainer } from "./styles";

function UpdateCliente() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  registerLocale('es', es);

  const handlePesquisaCPF = useCallback((event) => {
    event.preventDefault();
    const obg = {
      cpf,
    }
    console.log(obg);
  }, [cpf]);

  const handleCreateNewCliente = useCallback((event) => {
    event.preventDefault();
    const obg = {
      name,
      cpf,
      birthDate,
      address,
      gender,
      phoneNumber,
      mobileNumber,
      email,
    }
    console.log(obg);
  }, [name, cpf, birthDate, address, gender, phoneNumber, mobileNumber, email]);

  return (
    <div className="clientes">

      <CPFContainer onSubmit={handlePesquisaCPF}>
        <h2>Alterar Cliente</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o número do CPF"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CPFContainer>

      <Container onSubmit={handleCreateNewCliente}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(event) => setCpf(event.target.value)}
        />

        <input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <input
          type="text"
          placeholder="Celular"
          value={mobileNumber}
          onChange={(event) => setMobileNumber(event.target.value)}
        />
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <DatePicker locale='es' selected={birthDate} onChange={(date) => setBirthDate(date)} dateFormat="dd/MM/yyyy" placeholderText="Data de Nascimento" />
        <GenderContainer>
          <GenderContainerType>
            <label htmlFor="sexo_masc">Masculino</label>
            <input id="sexo_masc" type="radio" name="sexo" value="masculino" onChange={(event) => setGender(event.target.value)} />
          </GenderContainerType>
          <GenderContainerType>
            <label htmlFor="sexo_fem">Feminino</label>
            <input type="radio" id="sexo_fem" name="sexo" value="feminino" onChange={(event) => setGender(event.target.value)} />
          </GenderContainerType>
        </GenderContainer>

        <button type="submit">Alterar</button>
      </Container>
    </div>
  );
}

export default UpdateCliente;
