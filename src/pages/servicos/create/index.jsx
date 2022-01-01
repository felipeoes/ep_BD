/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../servicos.css";

import { Container } from "./styles";

function CreateServico() {

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  const handleCreateServico = useCallback((event) => {
    event.preventDefault();
    const obg = {
      nome, descricao, preco,
    }
    console.log(obg);

  }, [nome, descricao, preco]);

  return (
    <div className="servicos">
      <Container onSubmit={handleCreateServico}>
        <h2>Cadastrar Serviço</h2>

        <input
          type="text"
          placeholder="Nome Serviço"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <input
          type="text"
          placeholder="Descricao"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
        />
        <input
          type="number"
          min={1}
          placeholder="Preço"
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </div>
  );
}

export default CreateServico;
