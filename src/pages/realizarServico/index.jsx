/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "./servicos.css";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/pt-BR";

import { toast } from "react-toastify";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import { Container, CNPJContainer } from "./styles";

function RealizarServico() {
  const [cpf, setCpf] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [total, setTotal] = useState(0);
  const [servicosCarrinho, setServicosCarrinho] = useState([]);
  const [idServico, setIdServico] = useState("");
  const [nomeServico, setNomeServico] = useState("");
  const [precoServico, setPrecoServico] = useState(0);

  const [dataServico, setDataServico] = useState(new Date());

  registerLocale("es", es);
  let navigate = useNavigate();

  const handlePesquisaCpf = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const response = await api.get(`clientes/${cpf}`);
        const cliente = response.data;
        setNomeCliente(cliente.nome);
      } catch {
        toast.error("Cliente não encontrado");
        setNomeCliente("");
      }
    },
    [cpf]
  );

  const handlePesquisaCodServico = useCallback(
    async (event) => {
      event.preventDefault();
      //pesquisa cod barras
      console.log("cod barras");
      try {
        const response = await api.get(`servicos/${idServico}`);
        const servico = response.data;
        setIdServico(servico.id);
        setNomeServico(servico.nome);
        setPrecoServico(servico.preco);
      } catch {
        toast.error("Serviço não encontrado");
      }
    },
    [idServico]
  );

  const handlePedidoFornecedor = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const obg = {
          data_nascimento:
            dataServico.getFullYear() +
            "-" +
            (dataServico.getMonth() + 1) +
            "-" +
            dataServico.getDate(),
          id_servico: idServico,
          cpf_cliente: cpf,
          num_func: 9873271,
          codigo: Math.floor(Math.random() * 99999) + 1,
        };
        console.log(obg);
        api.defaults.headers.Authorization = "Basic ZmVsaXBlOjEyM2Zhcm1h";
        const response = await api.post(`servicos-realizados/`, obg);
        console.log(response.data);

        toast.success("Serviços cadastrados com sucesso!");
        navigate(`/servicos`);
      } catch {
        toast.error("Erro na realização do serviço.");
      }
    },
    [dataServico, cpf, idServico, navigate]
  );

  const handleAddCarrinho = useCallback(
    (event) => {
      const obj = {
        nome: nomeServico,
        preco: precoServico,
      };
      setServicosCarrinho([...servicosCarrinho, obj]);
      const newTotal = total + precoServico;
      setTotal(newTotal);

      console.log(servicosCarrinho);
      console.log(total);
    },
    [nomeServico, total, precoServico, servicosCarrinho]
  );

  return (
    <div className="servicos">
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
      <CNPJContainer onSubmit={handlePesquisaCodServico}>
        <div>
          <input
            type="text"
            placeholder="Digite o código do serviço"
            value={idServico}
            onChange={(event) => setIdServico(event.target.value)}
          />
          <input
            type="text"
            placeholder="Nome do Serviço"
            value={nomeServico}
            readOnly
          />
          <span>
            {" "}
            Preço:{" "}
            <input
              type="text"
              placeholder="Preço do Serviço"
              value={precoServico}
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

      {servicosCarrinho.length !== 0 && (
        <Container onSubmit={handlePedidoFornecedor}>
          <h2>Produtos no carrinho</h2>
          {servicosCarrinho.map((servico) => (
            <p key={servico.nome}>
              {servico.nome + " - R$ " + servico.preco + ",00"}
            </p>
          ))}
          <p class="total">Total a pagar: R$ {total},00</p>
          <button type="submit">Registrar Serviços</button>
        </Container>
      )}
    </div>
  );
}

export default RealizarServico;
