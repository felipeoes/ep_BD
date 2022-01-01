
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../fornecedores.css";

import { Container, CNPJContainer } from "./styles";

function UpdateFornecedor() {

  const [pesquisaCnpj, setPesquisaCnpj] = useState(false);

  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nome, setNome] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePesquisaCNPJ = useCallback(async (event) => {
    event.preventDefault();
    const obg = {
      cnpj,
    }
    console.log(obg);
    setPesquisaCnpj(true);

    console.log('cliquei');
  }, [cnpj]);

  const handleUpdateFornecedor = useCallback((event) => {
    event.preventDefault();
    const obg = {
      nome, cnpj, address, phoneNumber, email
    }
    console.log(obg);

  }, [nome, cnpj, address, phoneNumber, email]);

  return (
    <div className="fornecedores">

      <CNPJContainer onSubmit={handlePesquisaCNPJ}>
        <h2>Alterar Fornecedor</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o número do CNPJ"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CNPJContainer>

      <Container onSubmit={handleUpdateFornecedor}>

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
        <button type="submit">Atualizar</button>
      </Container>
    </div>
  );
}

export default UpdateFornecedor;
