import "./Sidebar.css";
import {Dashboard,Person,Medication,MedicalServices,Loyalty,LocalShipping,LocalGroceryStore} from '@mui/icons-material/';
import userIcon from '../../images/userIcon.png'; 
import {
    Link,
  } from "react-router-dom";
export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Vendas</h3>
                    <ul className="sidebarList">
                        <Link to="/">
                            <li className="sidebarListItem">
                                <Dashboard className="sidebarIcon"/> Dashboard
                            </li>
                        </Link>
                        <Link to="/servicos">
                            <li className="sidebarListItem">
                                <MedicalServices className="sidebarIcon"/> Serviços
                            </li>
                        </Link>
                        <Link to="/vender">
                            <li className="sidebarListItem">
                                <LocalGroceryStore className="sidebarIcon"/> Vender
                            </li>
                        </Link>
                    </ul>
                    <h3 className="sidebarTitle">Gerenciar</h3>
                    <ul className="sidebarList">
                        <Link to="/funcionarios">
                            <li className="sidebarListItem">
                                <Person className="sidebarIcon"/> Funcionários
                            </li>
                        </Link>
                        <Link to="/produtos">
                            <li className="sidebarListItem">
                                <Medication className="sidebarIcon"/> Produtos
                            </li>
                        </Link>
                        <Link to="/fidelidade">
                            <li className="sidebarListItem">
                                <Loyalty className="sidebarIcon"/> Programa de fidelidade
                            </li>
                        </Link>
                        <Link to="/fornecedores">
                            <li className="sidebarListItem">
                                <LocalShipping className="sidebarIcon"/> Fornecedores
                            </li>
                        </Link>
                        <Link to="/solicitarProduto">
                            <li className="sidebarListItem">
                                <Medication className="sidebarIcon"/> Solicitar Produtos ao Fornecedor
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className="userInfo">
                    <img alt="user icone" className="userIcon" src={userIcon}/>
                    <div className="message">
                        <span className="sideBarTitle">Nome Usuário</span>
                        <div className="sideBarMessageContainer">
                            <div className="bolaStatusUsuario"></div>
                            <span className="sideBarMessage">Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
