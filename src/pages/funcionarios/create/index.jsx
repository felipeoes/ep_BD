/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from "react";
import "../funcionarios.css";

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/pt-BR';

import api from '../../../services/api';

import { Container, GenderContainer, GenderContainerType } from "./styles";

function CreateFuncionario() {
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

  const handleCreateNewEmployee = useCallback(async (event) => {
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

    try {
      console.log('cliquei');

      var base64encodedData = Buffer.from('felipe' + ':' + '123farma').toString('base64');

      const response = await api.get('/funcionarios', {
        headers: {
          'Authorization': 'Basic ' + base64encodedData
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log('erro');
      console.log(error);
    }

  }, [address, birthDate, name, salary, gender, employeeType, otherEmployeeType]);

  return (
    <div className="funcionarios">
      <Container onSubmit={handleCreateNewEmployee}>
        <h2>Cadastrar Funcionário</h2>

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
            <input id="sexo_masc" type="radio" name="sexo" value="m" onChange={(event) => setGender(event.target.value)} />
          </GenderContainerType>
          <GenderContainerType>
            <label htmlFor="sexo_fem">Feminino</label>
            <input type="radio" id="sexo_fem" name="sexo" value="f" onChange={(event) => setGender(event.target.value)} />
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

        <button type="submit">Cadastrar</button>
      </Container>
    </div>
  );
}

export default CreateFuncionario;
