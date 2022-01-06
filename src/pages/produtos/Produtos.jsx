import React from "react";
import { Link } from "react-router-dom";
import { AddCircle, Edit, Search } from '@mui/icons-material/';

import "./produtos.css";

import { Container, Card, CardTitle, CardContainer } from "./styles.js";

export default function Produtos() {
  return (
    <div className="produtos">
      <Container>
        <h2>Gerenciar Produtos</h2>
        <CardContainer>
          <Card>
            <AddCircle color="primary" />
            <Link to='/create-prod'><CardTitle>Cadastrar Produto</CardTitle></Link>
          </Card>

          <Card>
            <Edit color="primary" />
            <Link to='/update-prod'><CardTitle>Alterar Produto</CardTitle></Link>
          </Card>

          <Card>
            <Search color="primary" />
            <Link to='/estoque-prod'><CardTitle>Consultar Estoque</CardTitle></Link>
          </Card>
        </CardContainer>
      </Container>
    </div>
  );
}
