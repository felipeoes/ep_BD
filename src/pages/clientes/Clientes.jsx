import React from "react";
import { Link } from "react-router-dom";
import { PersonAddAlt1, Edit, Search } from "@mui/icons-material/";
import "./clientes.css";

import { Container, Card, CardTitle, CardContainer } from "./styles.js";

export default function Clientes() {
  return (
    <div className="clientes">
      <Container>
        <h2>Gerenciar Clientes</h2>
        <CardContainer>
          <Card>
            <PersonAddAlt1 color="primary" />
            <Link to="/create-cli">
              <CardTitle>Cadastrar Clientes</CardTitle>
            </Link>
          </Card>

          <Card>
            <Edit color="primary" />
            <Link to="/update-cli">
              <CardTitle>Alterar Clientes</CardTitle>
            </Link>
          </Card>

          <Card>
            <Search color="primary" />
            <Link to="/srch-cli">
              <CardTitle>Pesquisar Cliente</CardTitle>
            </Link>
          </Card>
        </CardContainer>
      </Container>
    </div>
  );
}
