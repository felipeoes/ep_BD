/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../programaFidelidade.css";
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { Container } from "./styles";

function CreateProgramaFidelidade() {

  const [id, setId] = useState(Math.floor(Math.random() * 99) + 1);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fatorDesconto, setFatorDesconto] = useState("");

  let navigate = useNavigate();

  const handleCreateProgramaFidelidade = useCallback(async (event) => {

    event.preventDefault();
    try {

      const obg = {
        id, nome, descricao, fator_desconto: fatorDesconto,
      }
      console.log(obg);

      api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
      const response = await api.post(`programa-beneficios/`, obg);

      console.log(response);
      toast.success("Programa cadastrado com sucesso!");
      navigate(`/fidelidade`);

    } catch (error) {
      toast.error("Erro no casdastro do programa!");
      console.log('erro');
      console.log(error);
    }
  }, [id, nome, descricao, fatorDesconto, navigate]);

  return (
    <div className="funcionarios">
      <Container onSubmit={handleCreateProgramaFidelidade}>
        <h2>Cadastrar Programa de Fidelidade</h2>

        <input
          type="text"
          placeholder="Nome do programa"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
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
          max={99}
          placeholder="Fator de desconto (%)"
          value={fatorDesconto}
          onChange={(event) => setFatorDesconto(event.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </div>
  );
}

export default CreateProgramaFidelidade;
