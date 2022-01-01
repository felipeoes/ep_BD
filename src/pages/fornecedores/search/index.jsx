/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../fornecedores.css";

import { Container, CNPJContainer } from "./styles";

function PesquisarFornecedor() {
  const [cnpj, setCnpj] = useState("");

  const handlePesquisaCNPJ = useCallback((event) => {
    event.preventDefault();
    const obg = {
      cnpj
    }
    console.log(obg);
  }, [cnpj]);

  return (
    <div className="fornecedores">

      <CNPJContainer onSubmit={handlePesquisaCNPJ}>
        <h2>Pesquisar Fornecedor</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o número do CNPJ:"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CNPJContainer>

      <Container>
        <div>
          <p>Razão Social: </p>
          <p>Razão Social</p>
        </div>
        <div>
          <p>CNPJ: </p>
          <p>CNPJ Fornecedor</p>
        </div>
        <div>
          <p>Endereço: </p>
          <p>Endereço Fornecedor</p>
        </div>
        <div>
          <p>Telefone: </p>
          <p>Tel Fornecedor</p>
        </div>
        <div>
          <p>E-mail: </p>
          <p>Email Fornecedor</p>
        </div>
      </Container>
    </div>
  );
}

export default PesquisarFornecedor;
