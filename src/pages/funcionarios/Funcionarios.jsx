import React from "react";
import { Link } from "react-router-dom";
import { AddCircle, Edit, Search } from '@mui/icons-material/';

import "./funcionarios.css";

import { Container, Card, CardTitle, CardContainer } from "./styles.js";

export default function Funcionarios() {
  return (
    <div className="funcionarios">
      <Container>
        <h2>Gerenciar Funcionários</h2>
        <CardContainer>
          <Card>
            <AddCircle color="primary" />
            <Link to='/create-func'><CardTitle>Cadastrar Funcionário</CardTitle></Link>
          </Card>

          <Card>
            <Edit color="primary" />
            <Link to='/update-func'><CardTitle>Atualizar Funcionário</CardTitle></Link>
          </Card>

          <Card>
            <Search color="primary" />
            <Link to='/create-func'><CardTitle>Cadastrar Funcionário</CardTitle></Link>
          </Card>
        </CardContainer>
      </Container>
    </div>
  );
}
