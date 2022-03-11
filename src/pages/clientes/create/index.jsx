/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../clientes.css";

import { toast } from "react-toastify";
import api from "../../../services/api";

import {
  CreateProductContainer,
  CreateProductFormLabel,
  CreateProductFormInput,
  CreateProductButtonsContainer,
  SaveButton,
  CancelButton,
  EmployeeTypeSelect,
} from "./styles";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/pt-BR";

import { FormContainer, FormInput, FormLabel } from "../../auth/login/styles";
import { NameInputContainer } from "../../auth/signup/styles";

function CreateCliente(props) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("M");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  registerLocale("es", es);

  const handleCreateNewCliente = useCallback(
    async (event) => {
      event.preventDefault();
      props.handleOnClose();
      try {
        const obg = {
          nome: name,
          cpf,
          data_nascimento:
            birthDate.getFullYear() +
            "-" +
            (birthDate.getMonth() + 1) +
            "-" +
            birthDate.getDate(),
          sexo: gender,
          email,
          id_beneficios: 1,
        };
        console.log(obg);

        const response = await api.post(`clientes/`, obg);

        console.log(response);
        toast.success("Cliente cadastrado com sucesso!");
      } catch (error) {
        toast.error(
          "Erro no casdastro do cliente! Verificar os campos preenchidos"
        );
        console.log("erro");
        console.log(error);
      }
    },
    [cpf, birthDate, name, gender, email, props]
  );

  return (
    <CreateProductContainer>
      <FormContainer
        onSubmit={() => handleCreateNewCliente}
        style={{ marginTop: 0, width: "100%" }}
      >
        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Nome do Cliente
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite o nome do cliente"
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              CPF
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite o CPF de 11 dígitos"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              required
              max={11}
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
              placeholder="Digite o e-mail do cliente"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 35,
            }}
          >
            <CreateProductFormLabel htmlFor="firstName">
              Sexo
            </CreateProductFormLabel>
            <br />
            <EmployeeTypeSelect
              name="sexo"
              style={{ marginLeft: 0 }}
              onChange={(event) => setGender(event.target.value)}
            >
              <option defaultChecked value="M">
                Masculino
              </option>
              <option value="F">Feminino</option>
            </EmployeeTypeSelect>
          </div>
        </NameInputContainer>
        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Data Nascimento
            </CreateProductFormLabel>
            <br />
            <DatePicker
              className="data"
              locale="es"
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Data de Nascimento"
            />
          </div>
        </NameInputContainer>
        <CreateProductButtonsContainer>
          <CancelButton onClick={props.handleOnClose}>Cancelar</CancelButton>
          <SaveButton type="submit" onClick={handleCreateNewCliente}>
            Salvar
          </SaveButton>
        </CreateProductButtonsContainer>
      </FormContainer>
    </CreateProductContainer>
  );
}

export default CreateCliente;

// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useCallback, useState } from "react";
// import "../clientes.css";

// import DatePicker, { registerLocale } from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import es from 'date-fns/locale/pt-BR';

// import { toast } from 'react-toastify';
// import api from '../../../services/api';
// import { useNavigate } from 'react-router-dom';

// import { Container, GenderContainer, GenderContainerType } from "./styles";

// function CreateCliente() {
//   const [name, setName] = useState("");
//   const [cpf, setCpf] = useState("");
//   const [birthDate, setBirthDate] = useState("");
//   const [address, setAddress] = useState("");
//   const [gender, setGender] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   registerLocale('es', es);
//   let navigate = useNavigate();

//   const handleCreateNewCliente = useCallback(async (event) => {
//     event.preventDefault();
//     try {
//       console.log(birthDate);
//       const obg = {
//         nome: name,
//         cpf,
//         data_nascimento: (birthDate.getFullYear() + "-" + ((birthDate.getMonth() + 1)) + "-" + (birthDate.getDate())),
//         sexo: gender,
//         email,
//         id_beneficios: 1,
//       }
//       console.log(obg);

//
//       const response = await api.post(`clientes/`, obg);

//       await api.post('clientes-telefones', {
//         cpf,
//         telefone: phoneNumber,
//       });

//       console.log(response);
//       toast.success("Cliente cadastrado com sucesso!");
//       navigate(`/clientes`);

//     } catch (error) {
//       toast.error("Erro no casdastro do cliente!");
//       console.log('erro');
//       console.log(error);
//     }
//   }, [name, cpf, birthDate, gender, navigate, email, phoneNumber]);

//   return (
//     <div className="clientes">
//       <Container onSubmit={handleCreateNewCliente}>
//         <h2>Cadastrar Cliente</h2>

//         <input
//           type="text"
//           placeholder="Nome"
//           value={name}
//           onChange={(event) => setName(event.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="CPF"
//           value={cpf}
//           onChange={(event) => setCpf(event.target.value)}
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
//         <DatePicker locale='es' selected={birthDate} onChange={(date) => setBirthDate(date)} dateFormat="dd/MM/yyyy" placeholderText="Data de Nascimento" />
//         <GenderContainer>
//           <GenderContainerType>
//             <label htmlFor="sexo_masc">Masculino
//               <input id="sexo_masc" type="radio" name="sexo" value="M" onChange={(event) => setGender(event.target.value)} />
//             </label>
//           </GenderContainerType>
//           <GenderContainerType>
//             <label htmlFor="sexo_fem">Feminino
//               <input type="radio" id="sexo_fem" name="sexo" value="F" onChange={(event) => setGender(event.target.value)} />
//             </label>
//           </GenderContainerType>
//         </GenderContainer>

//         <button type="submit">Cadastrar</button>
//       </Container>
//     </div>
//   );
// }

// export default CreateCliente;
