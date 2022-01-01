import React, { useCallback, useState } from "react";
import "../produtos.css";

import { Container, CodBarrasContainer } from "./styles";

function UpdateProduto() {

  const [codBarras, setCodBarras] = useState("");
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");

  const handlePesquisarCodBarras = useCallback((event) => {
    event.preventDefault();
    const obg = {
      codBarras,
    }
    console.log(obg);

  }, [codBarras]);

  const handleAlterarProduto = useCallback((event) => {
    event.preventDefault();
    const obg = {
      codBarras, nome, categoria, preco
    }
    console.log(obg);

  }, [codBarras, nome, categoria, preco]);

  return (
    <div className="produtos">

      <CodBarrasContainer onSubmit={handlePesquisarCodBarras}>
        <h2>Alterar Produto</h2>
        <div>
          <input
            type="number"
            placeholder="Digite o número do Código de Barras"
            value={codBarras}
            onChange={(event) => setCodBarras(event.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CodBarrasContainer>

      <Container onSubmit={handleAlterarProduto}>
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

export default UpdateProduto;
