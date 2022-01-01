
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../programaFidelidade.css";

import { Container, ProgramaFidContainer } from "./styles";

function UpdateProgramaFidelidade() {

  const [idProgramaFidelidade, setIdProgramaFidelidade] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fatorDesconto, setFatorDesconto] = useState("");

  const handlePesquisaCNPJ = useCallback(async (event) => {
    event.preventDefault();
    const obg = {
      idProgramaFidelidade,
    }
    console.log(obg);
  }, [idProgramaFidelidade]);

  const handleUpdateProgramaFidelidade = useCallback(async (event) => {
    event.preventDefault();
    const obg = {
      idProgramaFidelidade, nome, descricao, fatorDesconto,
    }
    console.log(obg);

  }, [idProgramaFidelidade, nome, descricao, fatorDesconto]);

  return (
    <div className="fornecedores">

      <ProgramaFidContainer onSubmit={handlePesquisaCNPJ}>
        <h2>Alterar Programa de Fidelidade</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o código do programa"
            value={idProgramaFidelidade}
            onChange={(event) => setIdProgramaFidelidade(event.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </div>
      </ProgramaFidContainer>

      <Container onSubmit={handleUpdateProgramaFidelidade}>

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
        <button type="submit">Atualizar</button>
      </Container>
    </div>
  );
}

export default UpdateProgramaFidelidade;
