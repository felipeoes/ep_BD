/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../fornecedores.css";

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

function CreateFornecedor(props) {
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nome, setNome] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCreateProduto = useCallback(
    async (event) => {
      props.handleOnClose();

      event.preventDefault();
      const obg = {
        razao_social: nome, cnpj, endereco: address, email
      }
      console.log(obg);

      const tel = {
        cnpj_forn: cnpj, telefone: phoneNumber,
      }

      try {

        api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
        const response = await api.post(`fornecedores/`, obg);

        console.log(response);

        toast.success("Fornecedor cadastrado com sucesso!");

      } catch (error) {
        console.log("erro");
        console.log(error);
      }
    },
    [nome, cnpj, address, email, props, phoneNumber]
  );

  return (
    <CreateProductContainer>
      <FormContainer
        onSubmit={() => handleCreateProduto}
        style={{ marginTop: 0, width: "100%" }}
      >
        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Nome do Fornecedor
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite o nome do fornecedor"
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
              CNPJ
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="number"
              placeholder="Digite o CNPJ do fornecedor"
              value={cnpj}
              onChange={(event) => setCnpj(event.target.value)}
              required
              min={12}
              max={12}
            />
          </div>
        </NameInputContainer>

        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              E-mail
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="email"
              placeholder="Digite e-mail do fornecedor"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              Endereço
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Endereço"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>
        </NameInputContainer>
        <NameInputContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 12,
            }}
          >
            <CreateProductFormLabel htmlFor="firstName">
              Telefone
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Telefone"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
              max={11}
            />
          </div>
        </NameInputContainer>
        <CreateProductButtonsContainer>
          <CancelButton onClick={props.handleOnClose}>Cancelar</CancelButton>
          <SaveButton type="submit" onClick={handleCreateProduto}>
            Salvar
          </SaveButton>
        </CreateProductButtonsContainer>
      </FormContainer>
    </CreateProductContainer>
  );
}

export default CreateFornecedor;


// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useCallback, useState } from "react";
// import "../fornecedores.css";

// import { toast } from 'react-toastify';
// import api from '../../../services/api';
// import { useNavigate } from 'react-router-dom';
// import { Container } from "./styles";

// function CreateFornecedor() {
//   const [cnpj, setCnpj] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [nome, setNome] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   let navigate = useNavigate();

//   const handleCreateNewEmployee = useCallback(async (event) => {
//     event.preventDefault();
//     try {

//       const obg = {
//         razao_social: nome, cnpj, endereco: address, email
//       }
//       console.log(obg);

//       api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
//       const response = await api.post(`fornecedores/`, obg);

//       console.log(response);
//       toast.success("Fornecedor cadastrado com sucesso!");
//       navigate(`/fornecedores`);

//     } catch (error) {
//       toast.error("Erro no casdastro do fornecedor!");
//       console.log('erro');
//       console.log(error);
//     }
//   }, [nome, cnpj, address, email, navigate]);

//   return (
//     <div className="fornecedores">
//       <Container onSubmit={handleCreateNewEmployee}>
//         <h2>Cadastrar Fornecedor</h2>

//         <input
//           type="text"
//           placeholder="Razão Social"
//           value={nome}
//           onChange={(event) => setNome(event.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="CNPJ"
//           value={cnpj}
//           onChange={(event) => setCnpj(event.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Endereço"
//           value={address}
//           onChange={(event) => setAddress(event.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Telefone"
//           value={phoneNumber}
//           onChange={(event) => setPhoneNumber(event.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="E-mail"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//           required
//         />
//         <button type="submit">Cadastrar</button>
//       </Container>
//     </div>
//   );
// }

// export default CreateFornecedor;
