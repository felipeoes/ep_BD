import "./Sidebar.css";
import {Dashboard,Person,Medication} from '@mui/icons-material/';
import userIcon from '../../images/userIcon.png'; 

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Main</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <Dashboard className="sidebarIcon"/> Dashboard
                        </li>
                        <li className="sidebarListItem">
                            <Person className="sidebarIcon"/> Pessoa
                        </li>
                        <li className="sidebarListItem">
                            <Medication className="sidebarIcon"/> Produtos
                        </li>
                    </ul>
                    <h3 className="sidebarTitle">Components</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <Dashboard className="sidebarIcon"/> Dashboard
                        </li>
                        <li className="sidebarListItem">
                            <Person className="sidebarIcon"/> Pessoa
                        </li>
                        <li className="sidebarListItem">
                            <Medication className="sidebarIcon"/> Produtos
                        </li>
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
