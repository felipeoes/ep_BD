import { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Settings, Person } from "@mui/icons-material/";
import {
  MainContainer,
  MenuContainer,
  MenuItem,
  MenuItemsContainer,
  MenuTitle,
  UserInfoContainer,
} from "./styles";

import UserDetails from "./user-details/user-details";
import UserConfigs from "./user-configs/user-configs";

const userPages = [
  ["Detalhes do usuário", "/user-profile/details"],
  ["Configurações", "/user-profile/settings"],
];

const UserMenuItem = ({ path, itemName, onClick }) => {
  let resolved = useResolvedPath(path);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={path} onClick={onClick}>
      <MenuItem className={`user-menu ${match ? "active" : ""}`}>
        {itemName === "Detalhes do usuário" ? (
          <Person className="sidebarIcon" />
        ) : itemName === "Configurações" ? (
          <Settings className="sidebarIcon" />
        ) : (
          ""
        )}{" "}
        {itemName}
      </MenuItem>
    </Link>
  );
};

export default function UserProfile({ updatePage }) {
  const [detailsPage, setDetailsPage] = useState(true);
  const [configsPage, setConfigsPage] = useState(false);
  const [refresh, setRefresh] = useState(false);

  function handleOnRefresh() {
    setRefresh(!refresh);
  }

  function handleOnClickMenuItem(itemName) {
    console.log("entrei no handleClick", itemName);
    switch (itemName) {
      case "Detalhes do usuário":
        setDetailsPage(true);
        setConfigsPage(false);
        handleOnRefresh();
        break;
      case "Configurações":
        setDetailsPage(false);
        setConfigsPage(true);
        handleOnRefresh();
        break;
      default:
        console.log("default");
    }
  }

  return (
    <MainContainer>
      <MenuContainer>
        <MenuTitle>Perfil</MenuTitle>
        <MenuItemsContainer>
          {userPages.map((i) => (
            <UserMenuItem
              key={i}
              path={i[1]}
              itemName={i[0]}
              onClick={() => {
                updatePage(i[0]);
                handleOnClickMenuItem(i[0]);
              }}
            />
          ))}
        </MenuItemsContainer>
      </MenuContainer>
      {/* {detailsPage && <UserDetails refresh={refresh} />}
      {configsPage && <UserConfigs refreshPage={handleOnRefresh} />} */}
    </MainContainer>
  );
}
