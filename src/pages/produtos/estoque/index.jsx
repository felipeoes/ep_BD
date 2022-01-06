import React, { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../produtos.css";

import { Container, CodBarrasContainer } from "./styles";
import { toast } from 'react-toastify';
import api from '../../../services/api';

function EstoqueProduto() {

  const [pesquisaCodBarras, setPesquisaCodBarras] = useState(false);
  const [codBarras, setCodBarras] = useState("");
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [randomStock, setRandomStock] = useState(Math.floor(Math.random() * 100) + 20);

  let navigate = useNavigate();

  const handlePesquisarCodBarras = useCallback(async (event) => {
    event.preventDefault();
    try {

      api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
      const response = await api.get(`produtos/${codBarras}`);

      console.log(response);
      const produto = response.data;
      setNome(produto.nome);
      setCategoria(produto.categoria);
      setPreco(produto.preco);

      setPesquisaCodBarras(true);
    } catch (error) {
      toast.error("Produto não encontrado");
      console.log('erro');
      console.log(error);
    }

  }, [codBarras]);

  const handleAlterarProduto = useCallback(async (event) => {
    event.preventDefault();
    try {

      const obg = {
        codigo_barras: codBarras, nome, categoria, preco
      }

      console.log(obg);

      api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
      const response = await api.put(`produtos/${codBarras}/`, obg);

      console.log(response);
      toast.success("Produto atualizado com sucesso!");
      navigate(`/produtos`);

    } catch (error) {
      toast.error("Erro no update");
      console.log('erro');
      console.log(error);
    }

  }, [codBarras, navigate, categoria, nome, preco]);

  return (
    <div className="produtos">

      <CodBarrasContainer onSubmit={handlePesquisarCodBarras}>
        <h2>Consultar estoque de produto</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o código de barras"
            value={codBarras}
            onChange={(event) => setCodBarras(event.target.value)}
            required
            max={12}
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CodBarrasContainer>

      {pesquisaCodBarras && (

        <Container onSubmit={handleAlterarProduto}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            readOnly
          />
          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            readOnly
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            readOnly
          />
          <input
            type="text"
            placeholder="Estoque"
            value={`${randomStock} unidades`}
            readOnly
          />
          <button type="button" onClick={() => navigate(`/produtos`)}>Voltar</button>
        </Container>
      )
      }
    </div >
  );
}

export default EstoqueProduto;
