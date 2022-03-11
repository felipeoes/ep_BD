/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../fornecedores.css";

import { toast } from "react-toastify";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

import { Container, CNPJContainer } from "./styles";

function UpdateFornecedor() {
  const [pesquisaCnpj, setPesquisaCnpj] = useState(false);

  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nome, setNome] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  let navigate = useNavigate();

  const handlePesquisaCNPJ = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await api.get(`fornecedores/${cnpj}`);

        console.log(response);
        const fornecedor = response.data;
        setNome(fornecedor.razao_social);
        setAddress(fornecedor.endereco);
        setEmail(fornecedor.email);

        setPesquisaCnpj(true);
      } catch (error) {
        toast.error("Programa não encontrado!");
        console.log("erro");
        console.log(error);
        setPesquisaCnpj(false);
      }
    },
    [cnpj]
  );

  const handleUpdateFornecedor = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const obg = {
          razao_social: nome,
          cnpj,
          endereco: address,
          email,
        };
        console.log(obg);

        const response = await api.put(`fornecedores/${cnpj}/`, obg);

        console.log(response);
        toast.success("Fornecedor atualizado com sucesso!");
        navigate(`/fornecedores`);
      } catch (error) {
        toast.error("Erro na atualização do fornecedor!");
        console.log("erro");
        console.log(error);
      }
    },
    [nome, cnpj, address, email, navigate]
  );

  return (
    <div className="fornecedores">
      <CNPJContainer onSubmit={handlePesquisaCNPJ}>
        <h2>Alterar Fornecedor</h2>
        <div>
          <input
            type="number"
            placeholder="Digite o número do CNPJ"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
            required
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CNPJContainer>
      {pesquisaCnpj && (
        <Container onSubmit={handleUpdateFornecedor}>
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
          <button type="submit">Atualizar</button>
        </Container>
      )}
    </div>
  );
}

export default UpdateFornecedor;
