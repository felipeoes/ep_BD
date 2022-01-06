/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../clientes.css";

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/pt-BR';

import { toast } from 'react-toastify';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

import { Container, GenderContainer, GenderContainerType } from "./styles";

function CreateCliente() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  registerLocale('es', es);
  let navigate = useNavigate();

  const handleCreateNewCliente = useCallback(async (event) => {
    event.preventDefault();
    try {
      console.log(birthDate);
      const obg = {
        nome: name,
        cpf,
        data_nascimento: (birthDate.getFullYear() + "-" + ((birthDate.getMonth() + 1)) + "-" + (birthDate.getDate())),
        sexo: gender,
        email,
        id_beneficios: 1,
      }
      console.log(obg);

      api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
      const response = await api.post(`clientes/`, obg);

      await api.post('clientes-telefones', {
        cpf,
        telefone: phoneNumber,
      });

      console.log(response);
      toast.success("Cliente cadastrado com sucesso!");
      navigate(`/clientes`);

    } catch (error) {
      toast.error("Erro no casdastro do cliente!");
      console.log('erro');
      console.log(error);
    }
  }, [name, cpf, birthDate, gender, navigate, email, phoneNumber]);

  return (
    <div className="clientes">
      <Container onSubmit={handleCreateNewCliente}>
        <h2>Cadastrar Cliente</h2>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          type="number"
          placeholder="CPF"
          value={cpf}
          onChange={(event) => setCpf(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
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
        <DatePicker locale='es' selected={birthDate} onChange={(date) => setBirthDate(date)} dateFormat="dd/MM/yyyy" placeholderText="Data de Nascimento" />
        <GenderContainer>
          <GenderContainerType>
            <label htmlFor="sexo_masc">Masculino
              <input id="sexo_masc" type="radio" name="sexo" value="M" onChange={(event) => setGender(event.target.value)} />
            </label>
          </GenderContainerType>
          <GenderContainerType>
            <label htmlFor="sexo_fem">Feminino
              <input type="radio" id="sexo_fem" name="sexo" value="F" onChange={(event) => setGender(event.target.value)} />
            </label>
          </GenderContainerType>
        </GenderContainer>

        <button type="submit">Cadastrar</button>
      </Container>
    </div>
  );
}

export default CreateCliente;


