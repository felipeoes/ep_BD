/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import "../programaFidelidade.css";

import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, ProgramasContainer } from "./styles";

function ListarProgramasDeFidelidade() {

  const [programas, setProgramas] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    async function loadServices() {
      try {

        api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
        const response = await api.get(`programa-beneficios/`);

        console.log(response);
        const servicos = response.data.results;
        setProgramas([...servicos]);

      } catch (error) {
        toast.error("Não foi possível pesquisar os programas!");
        console.log('erro');
        console.log(error);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="programaFidelidade">

      <Container>
        <ProgramasContainer>
          {programas.map(programa =>
            <div key={programa.id} class="prog_container">
              <p>
                <span className="title">
                  ID:
                </span>
                <spam>
                  {programa.id}
                </spam>
              </p>
              <p>
                <span className="title">
                  Nome: {programa.nome}
                </span>
              </p>
              <p>
                <span className="title">
                  Categoria: {programa.descricao}
                </span>
              </p>
              <p>
                <span className="title">
                  Preço: {programa.fator_desconto}
                </span>
              </p>
            </div>
          )}

        </ProgramasContainer>
        <button type="button" onClick={() => navigate(`/fidelidade`)}>Voltar</button>
      </Container>
    </div>
  );
}

export default ListarProgramasDeFidelidade;
