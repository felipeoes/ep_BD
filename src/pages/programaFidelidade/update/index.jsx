/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../programaFidelidade.css";

import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Container, ProgramaFidContainer } from "./styles";

function UpdateProgramaFidelidade() {
  const [pesquisaPrograma, setPesquisaPrograma] = useState(false);
  const [idProgramaFidelidade, setIdProgramaFidelidade] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fatorDesconto, setFatorDesconto] = useState("");

  let navigate = useNavigate();

  const handlePesquisaPrograma = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await api.get(
          `programa-beneficios/${idProgramaFidelidade}`
        );

        console.log(response);
        const servico = response.data;
        setNome(servico.nome);
        setDescricao(servico.descricao);
        setFatorDesconto(servico.fator_desconto);

        setPesquisaPrograma(true);
      } catch (error) {
        toast.error("Programa não encontrado!");
        console.log("erro");
        console.log(error);
        setPesquisaPrograma(false);
      }
    },
    [idProgramaFidelidade]
  );

  const handleUpdateProgramaFidelidade = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const obg = {
          id: idProgramaFidelidade,
          nome,
          descricao,
          fator_desconto: Number(fatorDesconto),
        };
        console.log(obg);

        const response = await api.put(
          `programa-beneficios/${idProgramaFidelidade}/`,
          obg
        );

        console.log(response);
        toast.success("Programa atualizado com sucesso!");
        navigate(`/fidelidade`);
      } catch (error) {
        toast.error("Erro na atualização do programa!");
        console.log("erro");
        console.log(error);
      }
    },
    [idProgramaFidelidade, nome, descricao, fatorDesconto, navigate]
  );

  return (
    <div className="fornecedores">
      <ProgramaFidContainer onSubmit={handlePesquisaPrograma}>
        <h2>Alterar Programa de Fidelidade</h2>
        <div>
          <input
            type="number"
            placeholder="Digite o código do programa"
            value={idProgramaFidelidade}
            onChange={(event) => setIdProgramaFidelidade(event.target.value)}
            required
            min={1}
            max={99}
          />
          <button type="submit">Pesquisar</button>
        </div>
      </ProgramaFidContainer>
      {pesquisaPrograma && (
        <Container onSubmit={handleUpdateProgramaFidelidade}>
          <input
            type="text"
            placeholder="Nome Programa"
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
          <button type="submit">Atualizar</button>
        </Container>
      )}
    </div>
  );
}

export default UpdateProgramaFidelidade;
