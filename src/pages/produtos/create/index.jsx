/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../produtos.css";

import { toast } from 'react-toastify';
import api from '../../../services/api';

import { Container } from "./styles";

function CreateProduto() {

  const [codBarras, setCodBarras] = useState("");
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");

  const handleCreateProduto = useCallback(async (event) => {
    event.preventDefault();
    const obg = {
      codigo_barras: codBarras, nome, categoria, preco: Number(preco)
    }
    console.log(obg);

    try {

      api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
      const response = await api.post('produtos/', obg);

      console.log(response);
      toast.success("Cliente cadastrado com sucesso");

    } catch (error) {
      console.log('erro');
      console.log(error);
    }

  }, [nome, categoria, preco, codBarras]);

  return (
    <div className="funcionarios">
      <Container onSubmit={handleCreateProduto}>
        <h2>Cadastrar Produto</h2>
        
        <input
          type="text"
          placeholder="Código de Barras"
          value={codBarras}
          onChange={(event) => setCodBarras(event.target.value)}
          required
          max={12}
        />
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </div>
  );
}

export default CreateProduto;
