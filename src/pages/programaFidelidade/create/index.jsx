/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../programaFidelidade.css";

import { Container } from "./styles";

function CreateProgramaFidelidade() {

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fatorDesconto, setFatorDesconto] = useState("");

  const handleCreateProgramaFidelidade = useCallback(async (event) => {
    event.preventDefault();
    const obg = {
      nome, descricao, fatorDesconto,
    }
    console.log(obg);

  }, [nome, descricao, fatorDesconto]);

  return (
    <div className="funcionarios">
      <Container onSubmit={handleCreateProgramaFidelidade}>
        <h2>Cadastrar Programa de Fidelidade</h2>

        <input
          type="text"
          placeholder="Nome Programa"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <input
          type="descricao"
          placeholder="CNPJ"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
        />
        <input
          type="number"
          min={1}
          max={10}
          placeholder="Fator de desconto (%)"
          value={fatorDesconto}
          onChange={(event) => setFatorDesconto(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </div>
  );
}

export default CreateProgramaFidelidade;
