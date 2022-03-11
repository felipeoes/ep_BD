import "./Sidebar.css";
import {
  Dashboard,
  Person,
  PersonAddAlt1,
  Medication,
  MedicalServices,
  Loyalty,
  LocalShipping,
  LocalGroceryStore,
} from "@mui/icons-material/";
import logo from "../../assets/images/logoUSP.svg";

import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { useState } from "react";

const salesPages = [
  ["Dashboard", "/dashboard"],
  ["Serviços", "/servicos-vendas"],
  ["Vender", "/vender"],
];

const manegementPages = [
  ["Clientes", "/clientes"],
  ["Funcionários", "/funcionarios"],
  ["Produtos", "/produtos"],
  ["Gerenciar serviços", "/servicos"],
  ["Fidelidade", "/fidelidade"],
  ["Fornecedores", "/fornecedores"],
  ["Solicitações", "/solicitarProduto"],
];

export default function Sidebar({ updatePage }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("entered");
  }

  const SidebarItem = ({ path, itemName, onClick }) => {
    let resolved = useResolvedPath(path);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <Link to={path} onClick={onClick}>
        <li className={`sidebarListItem ${match ? "active" : ""}`}>
          {itemName === "Dashboard" ? (
            <Dashboard className="sidebarIcon" />
          ) : itemName === "Serviços" ? (
            <MedicalServices className="sidebarIcon" />
          ) : itemName === "Vender" ? (
            <LocalGroceryStore className="sidebarIcon" />
          ) : itemName === "Clientes" ? (
            <PersonAddAlt1 className="sidebarIcon" style={{ marginLeft: 3 }} />
          ) : itemName === "Funcionários" ? (
            <Person className="sidebarIcon" />
          ) : itemName === "Produtos" ? (
            <Medication className="sidebarIcon" />
          ) : itemName === "Gerenciar serviços" ? (
            <MedicalServices className="sidebarIcon" />
          ) : itemName === "Fidelidade" ? (
            <Loyalty className="sidebarIcon" />
          ) : itemName === "Fornecedores" ? (
            <LocalShipping className="sidebarIcon" />
          ) : itemName === "Solicitações" ? (
            <Medication className="sidebarIcon" />
          ) : (
            ""
          )}{" "}
          {itemName}
        </li>
      </Link>
    );
  };

  return (
    <div
      className="sidebar"
      onMouseEnter={toggleSidebar}
      onMouseLeave={toggleSidebar}
    >
      <div className="sidebarWrapper">
        <div className="topLeft">
          <img alt="logo" className="logoImg" src={logo} />
          {isSidebarOpen && <span className="logoTitle">FarmaUSP</span>}
        </div>
        <div className="sidebarMenu">
          {isSidebarOpen && <h3 className="sidebarTitle">Vendas</h3>}

          <ul className="sidebarList">
            {salesPages.map((i) => (
              <SidebarItem
                key={i}
                path={i[1]}
                itemName={i[0]}
                onClick={() => {
                  updatePage(i[0]);
                }}
              />
            ))}
          </ul>

          {isSidebarOpen && <h3 className="sidebarTitle">Gerenciar</h3>}

          <ul className="sidebarList">
            {manegementPages.map((i) => (
              <SidebarItem
                key={i}
                path={i[1]}
                itemName={i[0]}
                onClick={() => {
                  updatePage(i[0]);
                }}
              />
            ))}
          </ul>
        </div>

        {/* <div className="userInfo">
          <img alt="user icone" className="userIcon" src={userIcon} />
          <div className="message">
            <span className="sideBarTitle">Nome Usuário</span>
            <div className="sideBarMessageContainer">
              <div className="bolaStatusUsuario"></div>
              <span className="sideBarMessage">Online</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
