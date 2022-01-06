/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../fornecedores.css";

import { toast } from 'react-toastify';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { Container } from "./styles";

function CreateFornecedor() {
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nome, setNome] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  let navigate = useNavigate();

  const handleCreateNewEmployee = useCallback(async (event) => {
    event.preventDefault();
    try {

      const obg = {
        razao_social: nome, cnpj, endereco: address, email
      }
      console.log(obg);

      api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
      const response = await api.post(`fornecedores/`, obg);

      console.log(response);
      toast.success("Fornecedor cadastrado com sucesso!");
      navigate(`/fornecedores`);

    } catch (error) {
      toast.error("Erro no casdastro do fornecedor!");
      console.log('erro');
      console.log(error);
    }
  }, [nome, cnpj, address, email, navigate]);

  return (
    <div className="fornecedores">
      <Container onSubmit={handleCreateNewEmployee}>
        <h2>Cadastrar Fornecedor</h2>

        <input
          type="text"
          placeholder="Razão Social"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />
        <input
          type="number"
          placeholder="CNPJ"
          value={cnpj}
          onChange={(event) => setCnpj(event.target.value)}
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
        <button type="submit">Cadastrar</button>
      </Container>
    </div>
  );
}

export default CreateFornecedor;
