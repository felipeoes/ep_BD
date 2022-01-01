/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../clientes.css";

import { Container, CPFContainer } from "./styles";

function PesquisarCliente() {

  const [cpf, setCpf] = useState("");

  const handlePesquisaCPF = useCallback((event) => {
    event.preventDefault();
    const obg = {
      cpf,
    }
    console.log(obg);
  }, [cpf]);

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
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CPFContainer>

      <Container>
        <div>
          <p>Nome: </p>
          <p>Nome Cliente</p>
        </div>
        <div>
          <p>CPF: </p>
          <p>CPF Cliente</p>
        </div>
        <div>
          <p>Programa Fidalidade: </p>
          <p>Programa Fidelidade</p>
        </div>
        <div>
          <p>Endereço: </p>
          <p>Endereço Cliente</p>
        </div>
        <div>
          <p>Telefone: </p>
          <p>Tel Cliente</p>
        </div>
        <div>
          <p>Celular: </p>
          <p>Cel Cliente</p>
        </div>
        <div>
          <p>E-mail: </p>
          <p>Email Cliente</p>
        </div>
        <div>
          <p>Sexo: </p>
          <p>Sexo Cliente</p>
        </div>
      </Container>
    </div>
  );
}

export default PesquisarCliente;
