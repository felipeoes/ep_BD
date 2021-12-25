import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Produtos from "./pages/produtos/Produtos";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Servicos from "./pages/servicos/Servicos";
import Funcionarios from "./pages/funcionarios/Funcionarios";
import ProgramaFidelidade from "./pages/programaFidelidade/ProgramaFidelidade";
import Fornecedores from "./pages/fornecedores/Fornecedores";
import SolicitarProduto from "./pages/solicitarProduto/SolicitarProduto";
import Vender from "./pages/vender/Vender";

function App() {
  return (
    <Router>
     <Topbar/>
     <div className="container">
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/produtos' element={<Produtos/>} />
        <Route path='/servicos' element={<Servicos/>} />
        <Route path='/funcionarios' element={<Funcionarios/>} />
        <Route path='/fidelidade' element={<ProgramaFidelidade/>} />
        <Route path='/fornecedores' element={<Fornecedores/>} />
        <Route path='/solicitarProduto' element={<SolicitarProduto/>} />
        <Route path='/vender' element={<Vender/>} />

      </Routes>
     </div>
    </Router>
  );
}

export default App;
