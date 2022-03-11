import React, { useRef, useContext, useEffect, useState } from "react";
import "./Topbar.css";
import { Notifications, Search } from "@mui/icons-material/";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { TopbarLI, TopbarUL, UserIcon, TopbarLink } from "./styles";
import AuthContext from "../../contexts/auth";

export const Topbar = (props, ref) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [user, setUser] = useState(null);
  const { GetUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const currentUser = await GetUser();
    setUser(currentUser);
  }

  function handleOnSelect() {
    setIsActive(!isActive);
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
            {user && (
              <button onClick={handleOnSelect} className="menu-trigger">
                <span className="topbarUsername">
                  {user.first_name} {user.last_name}
                </span>
                <UserIcon src={user.profile_image} />
              </button>
            )}

            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <TopbarUL>
                <TopbarLI>
                  <TopbarLink to="/logout">Sair</TopbarLink>
                </TopbarLI>
                <TopbarLI>
                  <TopbarLink to="/user-profile/details">Gerenciar conta</TopbarLink>
                </TopbarLI>
              </TopbarUL>
            </nav>
          </div>

          {/* <div className="topBarBolaStatusUsuario"></div> */}
        </div>
      </div>
    </div>
  );
};
