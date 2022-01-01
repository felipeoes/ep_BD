/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Produtos from "./pages/produtos/Produtos";

import Servicos from "./pages/servicos/Servicos";
import ServicosVendas from "./pages/servicos/servicos-vendas";
import Funcionarios from "./pages/funcionarios/Funcionarios";
import ProgramaFidelidade from "./pages/programaFidelidade/ProgramaFidelidade";
import Fornecedores from "./pages/fornecedores/Fornecedores";
import SolicitarProduto from "./pages/solicitarProduto/SolicitarProduto";
import Vender from "./pages/vender";
import CreateFuncionarios from "./pages/funcionarios/create";
import UpdateFuncionarios from "./pages/funcionarios/update";
import CreateFornecedor from "./pages/fornecedores/create";
import UpdateFornecedor from "./pages/fornecedores/update";
import CreateProduto from "./pages/produtos/create";
import UpdateProduto from "./pages/produtos/update";
import Clientes from "./pages/clientes/Clientes";
import CreateCliente from "./pages/clientes/create";
import UpdateCliente from "./pages/clientes/update";
import PesquisarCliente from "./pages/clientes/search";
import PesquisarFornecedor from "./pages/fornecedores/search";
import CreateProgramaFidelidade from "./pages/programaFidelidade/create";
import UpdateProgramaFidelidade from "./pages/programaFidelidade/update";
import PesquisarProgramaFidelidade from "./pages/programaFidelidade/search";
import ListarProgramaFidelidade from "./pages/programaFidelidade/list";
import CreateServico from "./pages/servicos/create";
import UpdateServico from "./pages/servicos/update";
import ListServicos from "./pages/servicos/list";
import RealizarServico from "./pages/realizarServico";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="create-prod" element={<CreateProduto />} />
          <Route path="update-prod" element={<UpdateProduto />} />

          <Route path="servicos" element={<Servicos />} />
          <Route path="create-serv" element={<CreateServico />} />
          <Route path="update-serv" element={<UpdateServico />} />
          <Route path="list-serv" element={<ListServicos />} />
          <Route path="servicos-vendas" element={<ServicosVendas />} />
          
          <Route path="realizar-servico" element={<RealizarServico />} />

          <Route path="funcionarios" element={<Funcionarios />} />
          <Route path="create-func" element={<CreateFuncionarios />} />
          <Route path="update-func" element={<UpdateFuncionarios />} />

          <Route path="fidelidade" element={<ProgramaFidelidade />} />
          <Route path="create-fid" element={<CreateProgramaFidelidade />} />
          <Route path="update-fid" element={<UpdateProgramaFidelidade />} />
          <Route path="srch-fid" element={<PesquisarProgramaFidelidade />} />
          <Route path="list-fid" element={<ListarProgramaFidelidade />} />

          <Route path="fornecedores" element={<Fornecedores />} />
          <Route path="create-forn" element={<CreateFornecedor />} />
          <Route path="update-forn" element={<UpdateFornecedor />} />
          <Route path="srch-forn" element={<PesquisarFornecedor />} />

          <Route path="clientes" element={<Clientes />} />
          <Route path="create-cli" element={<CreateCliente />} />
          <Route path="update-cli" element={<UpdateCliente />} />
          <Route path="srch-cli" element={<PesquisarCliente />} />

          <Route path="solicitarProduto" element={<SolicitarProduto />} />
          <Route path="vender" element={<Vender />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
