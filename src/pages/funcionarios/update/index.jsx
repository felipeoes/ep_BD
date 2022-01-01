/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../funcionarios.css";

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/pt-BR';

import { Container, GenderContainer, GenderContainerType, FuncionalContainer } from "./styles";

function UpdateFuncionarios() {
  const [funcional, setFuncional] = useState("");
  const [pesquisaFuncional, setPesquisaFuncional] = useState(false);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [otherEmployeeType, setOtherEmployeeType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  registerLocale('es', es);

  const handleUpdateNewEmployee = useCallback(async (event) => {
    event.preventDefault();
    const obg = {
      name,
      birthDate,
      address,
      salary,
      gender,
      employeeType: employeeType === 'outros' && otherEmployeeType
    }
    console.log(obg);

    console.log('cliquei');
  }, [address, birthDate, name, salary, gender, employeeType, otherEmployeeType]);

  const handlePesquisaFuncional = useCallback(async (event) => {
    event.preventDefault();
    const obg = {
      funcional,
    }
    console.log(obg);
    setPesquisaFuncional(true);

    console.log('cliquei');
  }, [funcional]);

  return (
    <div className="funcionarios">
      <FuncionalContainer onSubmit={handlePesquisaFuncional}>
        <h2>Alterar Funcionário</h2>
        <div>
          <input
            type="text"
            placeholder="Digite o número da funcional"
            value={funcional}
            onChange={(event) => setFuncional(event.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </div>
      </FuncionalContainer>

      <Container onSubmit={handleUpdateNewEmployee}>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <input
          type="text"
          placeholder="Celular"
          value={mobileNumber}
          onChange={(event) => setMobileNumber(event.target.value)}
        />
        <DatePicker locale='es' selected={birthDate} onChange={(date) => setBirthDate(date)} dateFormat="dd/MM/yyyy" placeholderText="Data de Nascimento" />
        <GenderContainer>
          <GenderContainerType>
            <label htmlFor="sexo_masc">Masculino</label>
            <input id="sexo_masc" type="radio" name="sexo" value="masculino" onChange={(event) => setGender(event.target.value)} />
          </GenderContainerType>
          <GenderContainerType>
            <label htmlFor="sexo_fem">Feminino</label>
            <input type="radio" id="sexo_fem" name="sexo" value="feminino" onChange={(event) => setGender(event.target.value)} />
          </GenderContainerType>
        </GenderContainer>

        <select name="employeeType"
          onChange={(event) => setEmployeeType(event.target.value)}
        >
          <option value="farmaceutico">Farmaceutico</option>
          <option value="caixa">Caixa</option>
          <option value="gerente">Gerente</option>
          <option value="outros">outros</option>
        </select>
        {employeeType === 'outros' &&
          <input
            type="text"
            placeholder="Cargo Alternativo"
            value={otherEmployeeType}
            onChange={(event) => setOtherEmployeeType(event.target.value)}
          />
        }
        <input
          type="number"
          placeholder="Salário"
          value={salary}
          onChange={(event) => setSalary(event.target.value)}
        />

        <button type="submit">Atualizar</button>
      </Container>
    </div>
  );
}

export default UpdateFuncionarios;
