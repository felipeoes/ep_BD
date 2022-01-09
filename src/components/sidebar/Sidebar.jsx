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

import { Link } from "react-router-dom";
import { useState } from "react";

const salesPages = [
  ["Dashboard", "/"],
  ["Serviços", "/servicos-vendas"],
  ["Vender", "/vender"],
];

const manegementPages = [
  ["Clientes", "/clientes"],
  ["Funcionários", "/funcionarios"],
  ["Produtos", "/produtos"],
  ["Gerenciar serviços", "/servicos"],
  ["Programa de fidelidade", "/fidelidade"],
  ["Fornecedores", "/fornecedores"],
  ["Solicitações", "/solicitarProduto"],
];

export default function Sidebar({ updatePage }) {
  const [clickedPage, setClickedPage] = useState(0);

  function clickHandler(index) {
    console.log(index);
    setClickedPage(index);
  }

  const SidebarItem = ({ Icon, path, itemName, clicked, onClick }) => (
    <Link to={path} onClick={onClick}>
      <li className={`sidebarListItem ${clicked ? "active" : ""}`}>
        {itemName === "Dashboard" ? (
          <Dashboard className="sidebarIcon" />
        ) : itemName === "Serviços" ? (
          <MedicalServices className="sidebarIcon" />
        ) : itemName === "Vender" ? (
          <LocalGroceryStore className="sidebarIcon" />
        ) : itemName === "Clientes" ? (
          <PersonAddAlt1 className="sidebarIcon" />
        ) : itemName === "Funcionários" ? (
          <Person className="sidebarIcon" />
        ) : itemName === "Produtos" ? (
          <Medication className="sidebarIcon" />
        ) : itemName === "Gerenciar serviços" ? (
          <MedicalServices className="sidebarIcon" />
        ) : itemName === "Programa de fidelidade" ? (
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

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="topLeft">
          <img alt="logo" className="logoImg" src={logo} />
          <span className="logoTitle">FarmaUSP</span>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Vendas</h3>
          <ul className="sidebarList">
            {salesPages.map((i) => (
              <SidebarItem
                key={i}
                path={i[1]}
                itemName={i[0]}
                clicked={i[0] === clickedPage}
                onClick={() => {
                  clickHandler(i[0]);
                  updatePage(i[0]);
                }}
              />
            ))}
          </ul>

          <h3 className="sidebarTitle">Gerenciar</h3>

          <ul className="sidebarList">
            {manegementPages.map((i) => (
              <SidebarItem
                key={i}
                path={i[1]}
                itemName={i[0]}
                clicked={i[0] === clickedPage}
                onClick={() => {
                  clickHandler(i[0]);
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
