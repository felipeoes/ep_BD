/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../funcionarios.css";

import { toast } from "react-toastify";
import api from "../../../services/api";

import {
  CreateProductContainer,
  CreateProductFormLabel,
  CreateProductFormInput,
  CreateProductButtonsContainer,
  SaveButton,
  CancelButton,
  EmployeeTypeSelect
} from "./styles";
import { FormContainer, FormInput, FormLabel } from "../../auth/login/styles";
import { NameInputContainer } from "../../auth/signup/styles";

function CreateFuncionario(props) {
  const [name, setName] = useState("");
  const [funcional, setFuncional] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("M");
  const [employeeType, setEmployeeType] = useState("farmaceutico");
  const [otherEmployeeType, setOtherEmployeeType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [crf, setCrf] = useState('');

  const handleCreateFuncionario = useCallback(async (event) => {
    props.handleOnClose();
    event.preventDefault();

    let obg;
    if (employeeType === 'farmaceutico') {
      obg = {
        funcional: funcional,
        nome: name,
        salario: Number(salary),
        sexo: gender,
        tipo_func: 'farmaceutico',
        crf,
      }
    } else {
      obg = {
        funcional: funcional,
        nome: name,
        salario: Number(salary),
        sexo: gender,
        tipo_func: employeeType === 'outros' ? otherEmployeeType : employeeType,
      }
    }

    console.log(obg);

    try {

      api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
      const response = await api.post('funcionarios/', obg);

      console.log(response);
      toast.success("Funcionário cadastrado com sucesso");

    } catch (error) {
      toast.error("Erro no cadastro! Verifique os campos e tente novamente.");
      console.log('erro');
      console.log(error);
    }

  }, [funcional, name, crf, salary, gender, employeeType, otherEmployeeType, props]);

  return (
    <CreateProductContainer>
      <FormContainer
        onSubmit={() => handleCreateFuncionario}
        style={{ marginTop: 0, width: "100%" }}
      >
        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Nome do Funcionário
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Digite o nome do funcionário"
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
              Funcional
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="text"
              placeholder="Funcional com 7 dígitos"
              value={funcional}
              onChange={(event) => setFuncional(event.target.value)}
              required
              pattern="[0-9]{7}"
            />
          </div>
        </NameInputContainer>

        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Telefone
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="number"
              placeholder="Telefone"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
              pattern="[0-9]{7}"
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
              Tipo Funcionário
            </CreateProductFormLabel>
            <br />
            <EmployeeTypeSelect name="employeeType"
              onChange={(event) => setEmployeeType(event.target.value)}
            >
              <option value="farmaceutico">Farmaceutico</option>
              <option value="caixa">Caixa</option>
              <option value="gerente">Gerente</option>
              <option value="outros">outros</option>
            </EmployeeTypeSelect>
            {employeeType === 'outros' &&
              <CreateProductFormInput
                type="text"
                placeholder="Cargo Alternativo"
                value={otherEmployeeType}
                onChange={(event) => setOtherEmployeeType(event.target.value)}
              />
            }
            {employeeType === 'farmaceutico' &&
              <CreateProductFormInput
                type="text"
                placeholder="CRF com 6 dígitos"
                value={crf}
                onChange={(event) => setCrf(event.target.value)}
                required={employeeType === 'farmaceutico'}
                pattern="[0-9]{6}"
              />
            }
          </div>
        </NameInputContainer>
        <NameInputContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateProductFormLabel htmlFor="lastName">
              Salário
            </CreateProductFormLabel>
            <br />
            <CreateProductFormInput
              type="number"
              placeholder="Salário"
              value={salary}
              onChange={(event) => setSalary(event.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginRight: 30 }}>
            <CreateProductFormLabel htmlFor="lastName" style={{ marginLeft: 0 }}>
              Sexo
            </CreateProductFormLabel>
            <br />
            <EmployeeTypeSelect name="sexo" style={{ marginLeft: 0 }}
              onChange={(event) => setGender(event.target.value)}
            >
              <option defaultChecked value="M">Masculino</option>
              <option value="F">Feminino</option>
            </EmployeeTypeSelect>
          </div>
        </NameInputContainer>
        <CreateProductButtonsContainer>
          <CancelButton onClick={props.handleOnClose}>Cancelar</CancelButton>
          <SaveButton type="submit" onClick={handleCreateFuncionario}>
            Salvar
          </SaveButton>
        </CreateProductButtonsContainer>
      </FormContainer>
    </CreateProductContainer >
  );
}

export default CreateFuncionario;

// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useCallback, useState } from "react";
// import "../funcionarios.css";

// import { toast } from 'react-toastify';
// import api from '../../../services/api';

// import { Container, GenderContainer, GenderContainerType } from "./styles";

// function CreateFuncionario() {
//   const [name, setName] = useState("");
//   const [funcional, setFuncional] = useState("");
//   const [salary, setSalary] = useState("");
//   const [gender, setGender] = useState("");
//   const [employeeType, setEmployeeType] = useState("farmaceutico");
//   const [otherEmployeeType, setOtherEmployeeType] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [crf, setCrf] = useState('');

//   const handleCreateNewEmployee = useCallback(async (event) => {
//     event.preventDefault();

//     let obg;
//     if (employeeType === 'farmaceutico') {
//       obg = {
//         funcional: funcional,
//         nome: name,
//         salario: Number(salary),
//         sexo: gender,
//         tipo_func: 'farmaceutico',
//         crf,
//       }
//     } else {
//       obg = {
//         funcional: funcional,
//         nome: name,
//         salario: Number(salary),
//         sexo: gender,
//         tipo_func: employeeType === 'outros' ? otherEmployeeType : employeeType,
//       }
//     }

//     console.log(obg);

//     try {

//       api.defaults.headers.Authorization = 'Basic ZmVsaXBlOjEyM2Zhcm1h';
//       const response = await api.post('funcionarios/', obg);

//       console.log(response);
//       toast.success("Cliente cadastrado com sucesso");

//     } catch (error) {
//       console.log('erro');
//       console.log(error);
//     }

//   }, [funcional, name, crf, salary, gender, employeeType, otherEmployeeType]);

//   return (
//     <div className="funcionarios">
//       <Container onSubmit={handleCreateNewEmployee}>
//         <h2>Cadastrar Funcionário</h2>

//         <input
//           type="text"
//           placeholder="Nome"
//           value={name}
//           onChange={(event) => setName(event.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Funcional"
//           value={funcional}
//           onChange={(event) => setFuncional(event.target.value)}
//           required
//           pattern="[0-9]{7}"
//         />
//         <input
//           type="text"
//           placeholder="Telefone"
//           value={phoneNumber}
//           onChange={(event) => setPhoneNumber(event.target.value)}
//           required
//           pattern="[0-9]{7}"
//         />
//         <GenderContainer>
//           <GenderContainerType>
//             <label htmlFor="sexo_masc">Masculino
//               <input id="sexo_masc" required type="radio" name="sexo" value="M" onChange={(event) => setGender(event.target.value)} />
//             </label>
//           </GenderContainerType>
//           <GenderContainerType>
//             <label htmlFor="sexo_fem">Feminino
//               <input type="radio" id="sexo_fem" name="sexo" value="F" onChange={(event) => setGender(event.target.value)} />
//             </label>
//           </GenderContainerType>
//         </GenderContainer>

//         <select name="employeeType"
//           onChange={(event) => setEmployeeType(event.target.value)}
//         >
//           <option value="farmaceutico">Farmaceutico</option>
//           <option value="caixa">Caixa</option>
//           <option value="gerente">Gerente</option>
//           <option value="outros">outros</option>
//         </select>
//         {employeeType === 'outros' &&
//           <input
//             type="text"
//             placeholder="Cargo Alternativo"
//             value={otherEmployeeType}
//             onChange={(event) => setOtherEmployeeType(event.target.value)}
//           />
//         }
//         {employeeType === 'farmaceutico' &&
//           <input
//             type="text"
//             placeholder="crf"
//             value={crf}
//             onChange={(event) => setCrf(event.target.value)}
//             required={employeeType === 'farmaceutico'}
//             pattern="[0-9]{6}"
//           />
//         }
//         <input
//           type="number"
//           placeholder="Salário"
//           value={salary}
//           onChange={(event) => setSalary(event.target.value)}
//           required
//         />

//         <button type="submit">Cadastrar</button>
//       </Container>
//     </div>
//   );
// }

// export default CreateFuncionario;
