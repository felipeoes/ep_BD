/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "./solicitarProduto.css";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/pt-BR";

import { toast } from "react-toastify";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import { Container, CNPJContainer } from "./styles";

function SolicitarProduto() {
  const [cnpj, setCnpj] = useState("");
  const [nomeFornecedor, setNomeFornecedor] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState(0);
  const [dataValidade, setDataValidade] = useState("");
  const [quantidade, setQuantidade] = useState("");

  registerLocale("es", es);
  let navigate = useNavigate();

  const handlePesquisaCNPJ = useCallback(
    async (event) => {
      event.preventDefault();
      //pesquisa cnpj
      console.log("cnpj");

      try {
        const response = await api.get(`fornecedores/${cnpj}`);
        const fornecedor = response.data;
        setNomeFornecedor(fornecedor.razao_social);
      } catch {
        toast.error("Fornecedor não encontrado");
        setNomeFornecedor("");
      }
    },
    [cnpj]
  );

  const handlePesquisaCodBarras = useCallback(
    async (event) => {
      event.preventDefault();
      //pesquisa cod barras
      console.log("cod barras");
      try {
        const response = await api.get(`produtos/${codigoBarras}`);
        const produto = response.data;
        setNomeProduto(produto.nome);
        setPrecoProduto(produto.preco);
      } catch {
        toast.error("Produto não encontrado");
        setNomeProduto("");
      }
    },
    [codigoBarras]
  );

  const handlePedidoFornecedor = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const obg = {
          cnpj_forn: cnpj,
          codigo_barras: codigoBarras,
          quantidade,
          valor_total: precoProduto * quantidade,
          num_func: 9873271,
          numero_pedido: Math.floor(Math.random() * 99999) + 1,
        };
        console.log(obg);

        const response = await api.post(`solicitacoes-produtos/`, obg);
        console.log(response.data);

        toast.success("Pedido realizado com sucesso!");
        navigate(`/fornecedores`);
      } catch {
        toast.error("Erro na realização do pedido.");
      }
    },
    [cnpj, codigoBarras, quantidade, precoProduto, navigate]
  );

  return (
    <div className="solicitarProduto">
      <CNPJContainer onSubmit={handlePesquisaCNPJ}>
        <h2>Solicitação de produto ao Fornecedor</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o número do CNPJ do fornecedor"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nome Fornecedor"
            value={nomeFornecedor}
            readOnly
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CNPJContainer>
      <CNPJContainer onSubmit={handlePesquisaCodBarras}>
        <div>
          <input
            type="text"
            placeholder="Digite o número do Código de barras do produto"
            value={codigoBarras}
            onChange={(event) => setCodigoBarras(event.target.value)}
          />
          <input
            type="text"
            placeholder="Nome Produto"
            value={nomeProduto}
            readOnly
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CNPJContainer>

      <Container onSubmit={handlePedidoFornecedor}>
        <input
          type="number"
          placeholder="Quantidade solicitada"
          value={quantidade}
          onChange={(event) => setQuantidade(event.target.value)}
        />
        <DatePicker
          locale="es"
          selected={dataValidade}
          onChange={(date) => setDataValidade(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione a data de validade esperada"
        />
        <input
          type="text"
          placeholder="Valor Total"
          value={`Total a pagar: R$ ${quantidade * precoProduto} `}
        />
        <button type="submit">Enviar Pedido</button>
      </Container>
    </div>
  );
}

export default SolicitarProduto;
