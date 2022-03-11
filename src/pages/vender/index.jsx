/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "./vender.css";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/pt-BR";

import { toast } from "react-toastify";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import { Container, CNPJContainer } from "./styles";

function Venda() {
  const [cpf, setCpf] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [total, setTotal] = useState(0);
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const [codBarras, setCodBarras] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProcuto] = useState(0);
  const [programaBeneficio, setProgramaBeneficio] = useState(0);
  const [dataCompra, setDataCompra] = useState(new Date());
  const [formaPagamento, setFormaPagamento] = useState("credito");
  const [desconto, setDesconto] = useState(0);

  registerLocale("es", es);
  let navigate = useNavigate();

  const handlePesquisaCpf = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        let response = await api.get(`clientes/${cpf}`);
        const cliente = response.data;
        setNomeCliente(cliente.nome);
        const idBeneficio = cliente.id_beneficios;

        response = await api.get(`programa-beneficios/${idBeneficio}`);

        const programaBeneficioCliente = response.data;
        setProgramaBeneficio(programaBeneficioCliente);
        setDesconto(programaBeneficioCliente.fator_desconto);

        console.log(programaBeneficioCliente);
      } catch {
        toast.error("Cliente não encontrado");
      }
    },
    [cpf]
  );

  const handlePesquisaCodBarras = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await api.get(`produtos/${codBarras}`);
        const produto = response.data;
        setCodBarras(produto.id);
        setNomeProduto(produto.nome);
        setPrecoProcuto(produto.preco);
      } catch {
        toast.error("Serviço não encontrado");
      }
    },
    [codBarras]
  );

  const handleCompra = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const obg = {
          data_nascimento:
            dataCompra.getFullYear() +
            "-" +
            (dataCompra.getMonth() + 1) +
            "-" +
            dataCompra.getDate(),
          cpf_cliente: cpf,
          num_func: 9873271,
          codigo_compra: Math.floor(Math.random() * 99999) + 1,
          total,
          forma_pagamento: formaPagamento,
          desconto,
        };
        console.log(obg);
        const response = await api.post(`compras/`, obg);
        console.log(response.data);

        toast.success("Compra cadastrada com sucesso!");
        navigate(`/servicos`);
      } catch {
        toast.error("Erro na realização do serviço.");
      }
    },
    [dataCompra, cpf, desconto, formaPagamento, total, navigate]
  );

  const handleAddCarrinho = useCallback(
    (event) => {
      const obj = {
        nome: nomeProduto,
        preco: precoProduto,
      };
      setProdutosCarrinho([...produtosCarrinho, obj]);
      const newTotal = total + precoProduto;
      setTotal(newTotal);

      console.log(produtosCarrinho);
      console.log(total);
    },
    [nomeProduto, total, precoProduto, produtosCarrinho]
  );

  return (
    <div className="vender">
      <CNPJContainer onSubmit={handlePesquisaCpf}>
        <h2>Registro de serviços realizados</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o número do CPF do cliente"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nome do Cliente"
            value={nomeCliente}
            readOnly
          />
          <button type="submit">Pesquisar</button>
        </div>
      </CNPJContainer>
      <CNPJContainer onSubmit={handlePesquisaCodBarras}>
        <div>
          <input
            type="number"
            placeholder="Digite o código de barras do produto"
            value={codBarras}
            onChange={(event) => setCodBarras(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nome do Produto"
            value={nomeProduto}
            readOnly
          />
          <span>
            {" "}
            Preço:{" "}
            <input
              type="text"
              placeholder="Preço do Produto"
              value={precoProduto}
              readOnly
              className="preco"
            />
          </span>
          <button type="submit">Pesquisar</button>
          <button type="button" onClick={handleAddCarrinho}>
            Adicionar no carrinho
          </button>
        </div>
      </CNPJContainer>

      {produtosCarrinho.length !== 0 && (
        <Container onSubmit={handleCompra}>
          <h2>Produtos no carrinho</h2>
          {produtosCarrinho.map((produto) => (
            <p key={produto.nome}>
              {produto.nome + " - R$ " + produto.preco + ",00"}
            </p>
          ))}
          <p>Total: R$ {total},00</p>
          <p className="programa">
            Programa de Felidade Cadastrado: {programaBeneficio.nome} -{" "}
            {programaBeneficio.fator_desconto}% de desconto
          </p>
          <p className="total">
            Total a pagar: R$ {total * (1 - desconto / 100)}
          </p>
          <p>
            Selecione a forma de pagamento:
            <select
              name="employeeType"
              onChange={(event) => setFormaPagamento(event.target.value)}
            >
              <option value="credito">Crédito</option>
              <option value="debito">Débito</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </p>
          <button type="submit">Cadastrar Compra</button>
        </Container>
      )}
    </div>
  );
}

export default Venda;
