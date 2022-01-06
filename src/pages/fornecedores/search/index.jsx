/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import "../fornecedores.css";

import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, FornecedoresContainer } from "./styles";

function ListarFornecedores() {

  const [fornecedores, setFornecedores] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    async function loadFornecedores() {
      try {

        api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
        const response = await api.get(`fornecedores/`);

        console.log(response);
        const servicos = response.data.results;
        setFornecedores([...servicos]);

      } catch (error) {
        toast.error("Não foi possível pesquisar os programas!");
        console.log('erro');
        console.log(error);
      }
    }
    loadFornecedores();
  }, []);

  return (
    <div className="fornecedores">

      <Container>
        <FornecedoresContainer>
          {fornecedores.map(fornecedor =>
            <div key={fornecedor.cnpj} class="forn_container">
              <p>
                <span className="title">
                  CNPJ:
                </span>
                <spam>
                  {fornecedor.cnpj}
                </spam>
              </p>
              <p>
                <span className="title">
                  Razão Social: {fornecedor.razao_social}
                </span>
              </p>
              <p>
                <span className="title">
                  Endereço: {fornecedor.endereco}
                </span>
              </p>
              <p>
                <span className="title">
                  E-mail: {fornecedor.email}
                </span>
              </p>
            </div>
          )}

        </FornecedoresContainer>
        <button type="button" onClick={() => navigate(`/fornecedores`)}>Voltar</button>
      </Container>
    </div>
  );
}

export default ListarFornecedores;

