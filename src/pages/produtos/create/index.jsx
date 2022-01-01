/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../produtos.css";

import { Container } from "./styles";

function CreateProduto() {

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");

  const handleCreateProduto = useCallback(async (event) => {
    event.preventDefault();
    const obg = {
      nome, categoria, preco
    }
    console.log(obg);

  }, [nome, categoria, preco]);

  return (
    <div className="funcionarios">
      <Container onSubmit={handleCreateProduto}>
        <h2>Cadastrar Produto</h2>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
        />
        <input
          type="number"
          placeholder="Nome"
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </div>
  );
}

export default CreateProduto;
