import React from "react";
import { Link } from "react-router-dom";
import { AddCircle, Edit, Search } from '@mui/icons-material/';

import "./fornecedores.css";

import { Container, Card, CardTitle, CardContainer } from "./styles.js";

export default function Fornecedores() {
  return (
    <div className="fornecedores">
      <Container>
        <h2>Gerenciar Fornecedores</h2>
        <CardContainer>
          <Card>
            <AddCircle color="primary" />
            <Link to='/create-forn'><CardTitle>Cadastrar Fornecedores</CardTitle></Link>
          </Card>
          <Card>
            <Edit color="primary" />
            <Link to='/update-forn'><CardTitle>Atualizar Fornecedores</CardTitle></Link>
          </Card>
          <Card>
            <Search color="primary" />
            <Link to='/srch-forn'><CardTitle>Pesquisar Fornecedor</CardTitle></Link>
          </Card>
        </CardContainer>
      </Container>
    </div>
  );
}
