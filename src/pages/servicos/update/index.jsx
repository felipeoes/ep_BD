
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../servicos.css";

import { Container, ServicoIdContainer } from "./styles";

function UpdateServico() {

  const [idServico, setIdServico] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  const handlePesquisaIdServico = useCallback((event) => {
    event.preventDefault();
    const obg = {
      idServico,
    }
    console.log(obg);
  }, [idServico]);

  const handleUpdateServico = useCallback((event) => {
    event.preventDefault();
    const obg = {
      idServico, nome, descricao, preco,
    }
    console.log(obg);

  }, [idServico, nome, descricao, preco]);

  return (
    <div className="servicos">

      <ServicoIdContainer onSubmit={handlePesquisaIdServico}>
        <h2>Alterar Servico</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o código do serviço"
            value={idServico}
            onChange={(event) => setIdServico(event.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </div>
      </ServicoIdContainer>

      <Container onSubmit={handleUpdateServico}>

        <input
          type="text"
          placeholder="Nome Programa"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
        />
        <input
          type="number"
          min={1}
          placeholder="Fator de desconto (%)"
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
        />
        <button type="submit">Atualizar</button>
      </Container>
    </div>
  );
}

export default UpdateServico;
