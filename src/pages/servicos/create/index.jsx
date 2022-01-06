/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../servicos.css";

import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container } from "./styles";

function CreateServico() {

  const [id, setId] = useState(Math.floor(Math.random() * 99999) + 1);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  let navigate = useNavigate();

  const handleCreateServico = useCallback(async (event) => {
    event.preventDefault();
    try {

      const obg = {
        id, nome, descricao, preco,
      }
      console.log(obg);

      api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
      const response = await api.post(`servicos/`, obg);

      console.log(response);
      toast.success("Serviço cadastrado com sucesso!");
      navigate(`/servicos`);

    } catch (error) {
      toast.error("Erro no casdastro do serviço!");
      console.log('erro');
      console.log(error);
    }

  }, [nome, descricao, preco, navigate, id]);

  return (
    <div className="servicos">
      <Container onSubmit={handleCreateServico}>
        <h2>Cadastrar Serviço</h2>

        <input
          type="text"
          placeholder="Nome Serviço"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
          max={10}
        />
        <input
          type="text"
          placeholder="Descricao"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          required
        />
        <input
          type="number"
          min={1}
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

export default CreateServico;
