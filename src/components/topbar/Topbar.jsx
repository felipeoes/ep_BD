import React, { useEffect, useContext, useState, useRef } from "react";
import "./Topbar.css";
import { Notifications, Search } from "@mui/icons-material/";
import userIcon from "../../images/userIcon.png";
import AuthContext from "../../contexts/auth";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { UserIcon } from "./styles";

const userObj = {
  first_name: "",
  last_name: "",
  email: "",
};

export const Topbar = (props, ref) => {
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(userObj);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const context = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.replace("https://farma-usp.herokuapp.com/login");
    } else {
      fetch("https://farma-usp.herokuapp.com/api/v1/usuarios/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const user = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
          };

          setUser(user);
          context.user = user;
        });
    }
  }, []);

  function handleOnSelect() {
    setIsActive(!isActive);
  }

  function handleOnLogout() {
    context.Logout();
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <h3 className="topbarTitle">{props.currentPage}</h3>
        </div>
        <div className="topRight">
          <div className="topbarIconsContainer">
            <Search style={{ marginRight: 10 }} />
          </div>
          <div className="topbarIconsContainer">
            <Notifications />
            <span className="topIconBadge">3</span>
          </div>
          <div className="divider" />
          <div className="menu-container">
            <button onClick={handleOnSelect} className="menu-trigger">
              <span className="topbarUsername">
                {user.first_name} {user.last_name}
              </span>
              <UserIcon src="https://avatars.githubusercontent.com/u/62308968?v=4" />
            </button>
            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <ul>
                <li>
                  <a className="menuLink" href="/logout">Sair</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* <div className="topBarBolaStatusUsuario"></div> */}
        </div>
      </div>
    </div>
  );
};
