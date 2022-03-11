/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import "../servicos.css";

import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Container, ServicesContainer } from "./styles";

function ListServicos() {
  const [servicos, setServicos] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await api.get(`servicos/`);

        console.log(response);
        const servicos = response.data.results;
        setServicos([...servicos]);
      } catch (error) {
        toast.error("Não foi possível pesquisar os serviços!");
        console.log("erro");
        console.log(error);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="servicos">
      <Container>
        <ServicesContainer>
          {servicos.map((servico) => (
            <div class="serv_container">
              <p key={servico.id}>
                <span className="title">ID:</span>
                <spam>{servico.id}</spam>
              </p>
              <p>
                <span className="title">Nome: {servico.nome}</span>
              </p>
              <p>
                <span className="title">Categoria: {servico.descricao}</span>
              </p>
              <p>
                <span className="title">Preço: {servico.preco}</span>
              </p>
            </div>
          ))}
        </ServicesContainer>
        <button type="button" onClick={() => navigate(`/servicos-vendas`)}>
          Voltar
        </button>
      </Container>
    </div>
  );
}

export default ListServicos;
