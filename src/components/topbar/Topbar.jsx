import React from 'react'
import "./Topbar.css";
import {Notifications,Search} from '@mui/icons-material/';
import logo from '../../images/logo.png'; 
import userIcon from '../../images/userIcon.png'; 

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <img alt="logo" className="logoImg" src={logo}/>
                    <span className="logoTitle">Farmácia X</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconsContainer">
                        <Search/>
                    </div>
                    <div className="topbarIconsContainer">
                        <Notifications/>
                        <span className="topIconBadge">3</span>
                    </div>
                    <img alt="user icone" className="userIcon" src={userIcon}/>
                    <div className="topBarBolaStatusUsuario"></div>
                </div>
            </div> 
            <hr/>
        </div>
    )
}
