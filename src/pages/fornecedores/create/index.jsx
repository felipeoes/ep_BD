/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../fornecedores.css";

import { Container } from "./styles";

function CreateFornecedor() {
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nome, setNome] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCreateNewEmployee = useCallback(async (event) => {
    event.preventDefault();
    const obg = {
      nome, cnpj, address, phoneNumber, email
    }
    console.log(obg);

    console.log('cliquei');
  }, [nome, cnpj, address, phoneNumber, email]);

  return (
    <div className="funcionarios">
      <Container onSubmit={handleCreateNewEmployee}>
        <h2>Cadastrar Fornecedor</h2>

        <input
          type="text"
          placeholder="Razão Social"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <input
          type="text"
          placeholder="CNPJ"
          value={cnpj}
          onChange={(event) => setCnpj(event.target.value)}
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
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </div>
  );
}

export default CreateFornecedor;
