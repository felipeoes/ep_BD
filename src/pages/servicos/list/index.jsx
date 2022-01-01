/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import "../servicos.css";

import { Container } from "./styles";

function ListServicos() {

  return (
    <div className="servicos">

      <Container>
        <p>Listar Todos os Serviços com id, nome e prço</p>
      </Container>
    </div>
  );
}

export default ListServicos;
