import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../contexts/auth";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//rotas não-autenticadas
import Login from "../pages/auth/login/Login";
import Logout from "../pages/auth/logout/logout";
import Signup from "../pages/auth/signup/Signup";

import Sidebar from "../components/sidebar/Sidebar";
import { Topbar } from "../components/topbar/Topbar";
import Dashboard from "../pages/dashboard/Dashboard";

//rotas autenticadas
import Produtos from "../pages/produtos/Produtos";
import Servicos from "../pages/servicos/Servicos";
import ServicosVendas from "../pages/servicos/servicos-vendas";
import Funcionarios from "../pages/funcionarios/Funcionarios";
import ProgramaFidelidade from "../pages/programaFidelidade/ProgramaFidelidade";
import Fornecedores from "../pages/fornecedores/Fornecedores";
import SolicitarProduto from "../pages/solicitarProduto/SolicitarProduto";
import Vender from "../pages/vender";
import CreateFuncionarios from "../pages/funcionarios/create";
import UpdateFuncionarios from "../pages/funcionarios/update";
import CreateFornecedor from "../pages/fornecedores/create";
import UpdateFornecedor from "../pages/fornecedores/update";
import CreateProduto from "../pages/produtos/create";
import UpdateProduto from "../pages/produtos/update";
import EstoqueProduto from "../pages/produtos/estoque";
import Clientes from "../pages/clientes/Clientes";
import CreateCliente from "../pages/clientes/create";
import UpdateCliente from "../pages/clientes/update";
import PesquisarCliente from "../pages/clientes/search";
import PesquisarFornecedor from "../pages/fornecedores/search";
import CreateProgramaFidelidade from "../pages/programaFidelidade/create";
import UpdateProgramaFidelidade from "../pages/programaFidelidade/update";
import PesquisarProgramaFidelidade from "../pages/programaFidelidade/search";
import ListarProgramaFidelidade from "../pages/programaFidelidade/list";
import CreateServico from "../pages/servicos/create";
import UpdateServico from "../pages/servicos/update";
import ListServicos from "../pages/servicos/list";
import RealizarServico from "../pages/realizarServico";

const MyRoutes = () => {
  const context = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  
  function updatePage(pageName) {
    setCurrentPage(pageName);
  }

  function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = context.signed;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  return (
    <BrowserRouter>
      <ToastContainer autoclose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="*"
          element={
            <RequireAuth redirectTo="/login">
              <Sidebar updatePage={updatePage} />
              <div className="contentWrapper" style={{ width: "100%" }}>
                <Topbar currentPage={currentPage} />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/logout" element={<Logout />} />

                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/servicos" element={<Servicos />} />
                  <Route path="produtos" element={<Produtos />} />
                  <Route path="create-prod" element={<CreateProduto />} />
                  <Route path="update-prod" element={<UpdateProduto />} />
                  <Route path="estoque-prod" element={<EstoqueProduto />} />

                  <Route path="servicos" element={<Servicos />} />
                  <Route path="create-serv" element={<CreateServico />} />
                  <Route path="update-serv" element={<UpdateServico />} />
                  <Route path="list-serv" element={<ListServicos />} />
                  <Route path="servicos-vendas" element={<ServicosVendas />} />

                  <Route
                    path="realizar-servico"
                    element={<RealizarServico />}
                  />

                  <Route path="funcionarios" element={<Funcionarios />} />
                  <Route path="create-func" element={<CreateFuncionarios />} />
                  <Route path="update-func" element={<UpdateFuncionarios />} />

                  <Route path="fidelidade" element={<ProgramaFidelidade />} />
                  <Route
                    path="create-fid"
                    element={<CreateProgramaFidelidade />}
                  />
                  <Route
                    path="update-fid"
                    element={<UpdateProgramaFidelidade />}
                  />
                  <Route
                    path="srch-fid"
                    element={<PesquisarProgramaFidelidade />}
                  />
                  <Route
                    path="list-fid"
                    element={<ListarProgramaFidelidade />}
                  />

                  <Route path="fornecedores" element={<Fornecedores />} />
                  <Route path="create-forn" element={<CreateFornecedor />} />
                  <Route path="update-forn" element={<UpdateFornecedor />} />
                  <Route path="srch-forn" element={<PesquisarFornecedor />} />

                  <Route path="clientes" element={<Clientes />} />
                  <Route path="create-cli" element={<CreateCliente />} />
                  <Route path="update-cli" element={<UpdateCliente />} />
                  <Route path="srch-cli" element={<PesquisarCliente />} />

                  <Route
                    path="solicitarProduto"
                    element={<SolicitarProduto />}
                  />
                  <Route path="vender" element={<Vender />} />
                </Routes>
              </div>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
