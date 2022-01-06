
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../servicos.css";

import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, ServicoIdContainer } from "./styles";

function UpdateServico() {

  const [pesquisaIdServico, setPesquisaIdServico] = useState(false);
  const [idServico, setIdServico] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  let navigate = useNavigate();

  const handlePesquisaIdServico = useCallback(async (event) => {
    event.preventDefault();
    try {

      api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
      const response = await api.get(`servicos/${idServico}`);

      console.log(response);
      const servico = response.data;
      setNome(servico.nome);
      setPreco(servico.preco);
      setDescricao(servico.descricao);
      setPesquisaIdServico(true);

    } catch (error) {
      toast.error("Serviço não encontrado!");
      console.log('erro');
      console.log(error);
      setPesquisaIdServico(false);
    }
  }, [idServico]);

  const handleUpdateServico = useCallback(async (event) => {
    event.preventDefault();
    try {

      const obg = {
        id: idServico, nome, descricao, preco,
      }
      console.log(obg);

      api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
      const response = await api.put(`servicos/${idServico}/`, obg);

      console.log(response);
      toast.success("Serviço atualizado com sucesso!");
      navigate(`/servicos`);

    } catch (error) {
      toast.error("Erro na atualização do serviço!");
      console.log('erro');
      console.log(error);
    }

  }, [nome, descricao, preco, navigate, idServico]);

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
      {
        pesquisaIdServico && (
          <Container onSubmit={handleUpdateServico}>

            <input
              type="text"
              placeholder="Nome Programa"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
              max={10}
            />
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              required
            />
            <input
              type="number"
              min={1}
              placeholder="Fator de desconto (%)"
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
              required
            />
            <button type="submit">Atualizar</button>
          </Container>
        )
      }
    </div>
  );
}

export default UpdateServico;
