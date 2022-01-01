/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../programaFidelidade.css";

import { Container, ProgramaFidContainer } from "./styles";

function PesquisarProgramaFidelidade() {

  const [idProgramaFidelidade, setIdProgramaFidelidade] = useState("");

  const handlePesquisaCNPJ = useCallback((event) => {
    event.preventDefault();
    const obg = {
      idProgramaFidelidade
    }
    console.log(obg);
  }, [idProgramaFidelidade]);

  return (
    <div className="programaFidelidade">

      <ProgramaFidContainer onSubmit={handlePesquisaCNPJ}>
        <h2>Pesquisar Programa de Fidelidade</h2>
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

      <Container>
        <div>
          <p>Id Programa: </p>
          <p>Id Programa</p>
        </div>
        <div>
          <p>Nome: </p>
          <p>Nome Programa</p>
        </div>
        <div>
          <p>Descrição Programa: </p>
          <p>Descrocao Programa</p>
        </div>
        <div>
          <p>Fator desconto: </p>
          <p>Fator desconto: </p>
        </div>
      </Container>
    </div>
  );
}

export default PesquisarProgramaFidelidade;
