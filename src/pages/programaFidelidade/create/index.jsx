/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../programaFidelidade.css";

import { toast } from "react-toastify";
import api from "../../../services/api";

import {
  CreateProductContainer,
  CreateProductFormLabel,
  CreateProductFormInput,
  CreateProductButtonsContainer,
  SaveButton,
  CancelButton,
} from "./styles";
import { FormContainer, FormInput, FormLabel } from "../../auth/login/styles";
import { NameInputContainer } from "../../auth/signup/styles";

function CreateProgramaFidelidade(props) {
  const [id, setId] = useState(Math.floor(Math.random() * 99) + 1);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fatorDesconto, setFatorDesconto] = useState("");

  const handleCreateProgramaBeneficio = useCallback(
    async (event) => {
      props.handleOnClose();
      event.preventDefault();

      const obg = {
        id,
        nome,
        descricao,
        fator_desconto: fatorDesconto,
      };
      console.log(obg);

      try {
        const response = await api.post(`programa-beneficios/`, obg);

        console.log(response);
        toast.success("Programa fidelidade cadastrado com sucesso");
      } catch (error) {
        console.log("erro");
        console.log(error);
      }
    },
    [descricao, fatorDesconto, props, id, nome]
  );

  return (
    <CreateProductContainer>
      <FormContainer
        onSubmit={() => handleCreateProgramaBeneficio}
        style={{ marginTop: 0, width: "100%" }}
      >
        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Nome do programa
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite o nome do programa"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 12,
            }}
          >
            <CreateProductFormLabel htmlFor="firstName">
              Descrição
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite a descrição do programa"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              required
            />
          </div>
        </NameInputContainer>

        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Fator Desconto
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="number"
              placeholder="Digite o fator de desconto"
              value={fatorDesconto}
              onChange={(event) => setFatorDesconto(event.target.value)}
              required
            />
          </div>
        </NameInputContainer>
        <CreateProductButtonsContainer>
          <CancelButton onClick={props.handleOnClose}>Cancelar</CancelButton>
          <SaveButton type="submit" onClick={handleCreateProgramaBeneficio}>
            Salvar
          </SaveButton>
        </CreateProductButtonsContainer>
      </FormContainer>
    </CreateProductContainer>
  );
}

export default CreateProgramaFidelidade;

// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useCallback, useState } from "react";
// import "../programaFidelidade.css";
// import { toast } from 'react-toastify';
// import api from '../../../services/api';
// import { useNavigate } from 'react-router-dom';
// import { Container } from "./styles";

// function CreateProgramaFidelidade() {

//   const [id, setId] = useState(Math.floor(Math.random() * 99) + 1);
//   const [nome, setNome] = useState("");
//   const [descricao, setDescricao] = useState("");
//   const [fatorDesconto, setFatorDesconto] = useState("");

//   let navigate = useNavigate();

//   const handleCreateProgramaFidelidade = useCallback(async (event) => {

//     event.preventDefault();
//     try {

//       const obg = {
//         id, nome, descricao, fator_desconto: fatorDesconto,
//       }
//       console.log(obg);

//
//       const response = await api.post(`programa-beneficios/`, obg);

//       console.log(response);
//       toast.success("Programa cadastrado com sucesso!");
//       navigate(`/fidelidade`);

//     } catch (error) {
//       toast.error("Erro no casdastro do programa!");
//       console.log('erro');
//       console.log(error);
//     }
//   }, [id, nome, descricao, fatorDesconto, navigate]);

//   return (
//     <div className="funcionarios">
//       <Container onSubmit={handleCreateProgramaFidelidade}>
//         <h2>Cadastrar Programa de Fidelidade</h2>

//         <input
//           type="text"
//           placeholder="Nome do programa"
//           value={nome}
//           onChange={(event) => setNome(event.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Descrição"
//           value={descricao}
//           onChange={(event) => setDescricao(event.target.value)}
//           required
//         />
//         <input
//           type="number"
//           min={1}
//           max={99}
//           placeholder="Fator de desconto (%)"
//           value={fatorDesconto}
//           onChange={(event) => setFatorDesconto(event.target.value)}
//           required
//         />
//         <button type="submit">Cadastrar</button>
//       </Container>
//     </div>
//   );
// }

// export default CreateProgramaFidelidade;
