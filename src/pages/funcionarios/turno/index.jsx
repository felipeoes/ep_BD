/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, useEffect } from "react";
import "../funcionarios.css";

import { toast } from "react-toastify";
import api from "../../../services/api";
import Autocomplete from "@mui/material/Autocomplete";

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

import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

function CreateTurno(props) {
  const [descricao, setDescricao] = useState("");
  const [dataEntrada, setDataEntrada] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [dataSaida, setDataSaida] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [funcional, setFuncional] = useState("");

  registerLocale("es", es);

  const handleCreateNewTurno = useCallback(
    async (event) => {
      event.preventDefault();
      props.handleOnClose();
      try {
        const obg = {
          funcional,
          data_hora_entrada:
            dataEntrada.getFullYear() +
            "-" +
            (dataEntrada.getMonth() + 1) +
            "-" +
            dataEntrada.getDate(),
          data_hora_saida:
            dataSaida.getFullYear() +
            "-" +
            (dataSaida.getMonth() + 1) +
            "-" +
            dataSaida.getDate(),
          descricao,
        };
        console.log(obg);

        const response = await api.post(`turnos/`, obg);

        console.log(response);
        toast.success("Turno cadastrado com sucesso!");
      } catch (error) {
        toast.error(
          "Erro no casdastro do turno! Verificar os campos preenchidos"
        );
        console.log("erro");
        console.log(error);
      }
    },
    [props, dataEntrada, dataSaida, descricao, funcional]
  );

  return (
    <CreateProductContainer>
      <FormContainer
        onSubmit={() => handleCreateNewTurno}
        style={{ marginTop: 0, width: "100%" }}
      >
        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Nome do Funcionário
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="number"
              placeholder="Digite a funcional do funcionário de 7 dígitos"
              value={funcional}
              onChange={(event) => setFuncional(event.target.value)}
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
              Data e Hora de entrada
            </CreateProductFormLabel>
            <br />
            <DatePicker
              locale="es"
              className="data"
              selected={dataEntrada}
              onChange={(date) => setDataEntrada(date)}
              showTimeSelect
              includeTimes={[
                setHours(setMinutes(new Date(), 0), 17),
                setHours(setMinutes(new Date(), 30), 18),
                setHours(setMinutes(new Date(), 30), 19),
                setHours(setMinutes(new Date(), 30), 17),
              ]}
              dateFormat="MMMM d, yyyy HH:mm"
            />
          </div>
        </NameInputContainer>

        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Data/Hora de saída
            </CreateProductFormLabel>
            <br />
            <DatePicker
              className="data"
              selected={dataSaida}
              onChange={(date) => setDataSaida(date)}
              showTimeSelect
              includeTimes={[
                setHours(setMinutes(new Date(), 0), 17),
                setHours(setMinutes(new Date(), 30), 18),
                setHours(setMinutes(new Date(), 30), 19),
                setHours(setMinutes(new Date(), 30), 17),
              ]}
              dateFormat="MMMM d, yyyy HH:mm"
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
              Descrição
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite a descrição das atividades"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              required
            />
          </div>
        </NameInputContainer>
        <CreateProductButtonsContainer>
          <CancelButton onClick={props.handleOnClose}>Cancelar</CancelButton>
          <SaveButton type="submit" onClick={handleCreateNewTurno}>
            Salvar
          </SaveButton>
        </CreateProductButtonsContainer>
      </FormContainer>
    </CreateProductContainer>
  );
}

export default CreateTurno;

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
