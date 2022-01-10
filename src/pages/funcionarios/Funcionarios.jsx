import React, { useState, useEffect } from "react";
import { AddCircle, Edit } from "@mui/icons-material/";

import "./funcionarios.css";

import api from "../../services/api";
import { toast } from "react-toastify";

import {
  Container,
  AutocompleteContainer,
  AddEmployeeButton,
  ButtonsContainer,
  EmployeeLabelsContainer,
  EmployeeLabel,
  EmployeeCard,
  EmployeeName,
  EmployeeCommonInfo,
  EmployeeEditContainer,
  SecondLabelsContainer,
} from "./styles.js";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Funcionarios() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredEmployeesNames, setFilteredEmployeesNames] = useState([]);

  useEffect(() => {
    async function loadEmployees() {
      try {
        api.defaults.headers.Authorization = "Basic ZmVsaXBlOjEyM2Zhcm1h";
        const response = await api.get(`funcionarios/`);

        console.log(response);
        const employees = response.data.results;
        setEmployees([...employees]);
        setFilteredEmployees(employees);

        populateData(employees);
      } catch (error) {
        toast.error("Não foi possível pesquisar os funcionários!");
        console.log("erro");
        console.log(error);
      }
    }
    loadEmployees();
  }, []);

  function getEmployeeNames() {
    const names = [];
    employees.map((employee) => {
      names.push(employee.nome);
    });
    setFilteredEmployeesNames(names);
  }

  function populateData(employees) {
    const employeeNames = [];
    employees.map((employee) => {
      employeeNames.push(employee.nome);
    });
    setFilteredEmployeesNames(employeeNames);
  }

  function handleOnSelect(employee) {
    setSelectedEmployee(employee);
  }

  const findEmployee = (employee) => {
    if (employee) {
      const regex = new RegExp(`${employee.trim()}`, "i");
      setFilteredEmployeesNames(
        filteredEmployeesNames.filter((employee) => employee.search(regex) >= 0)
      );
      setFilteredEmployees(
        filteredEmployees.filter((employee) => employee.nome.search(regex) >= 0)
      );
    } else {
      setFilteredEmployeesNames(getEmployeeNames());
      setFilteredEmployees(employees);
    }
    console.log(filteredEmployeesNames);
  };

  console.log(filteredEmployees);

  return (
    <Container>
      <div className="content">
        <AutocompleteContainer>
          <Autocomplete
            onSelect={(value) => {
              handleOnSelect(value);
            }}
            id="auto-complete"
            autoComplete
            includeInputInList
            onInputChange={(event, value) => findEmployee(value)}
            options={filteredEmployeesNames}
            size="small"
            placeholder="Digite o nome do funcionário"
            style={{
              width: 271,
              border: 0,
              height: 38,
              backgroundColor: "white",
            }}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                placeholder="Digite o nome do funcionário"
                style={{
                  width: 271,
                  height: 38,
                  backgroundColor: "white",
                }}
                {...params}
                label="Funcionário"
              ></TextField>
            )}
          />
          <h2> Funcionários FarmaUSP </h2>
        </AutocompleteContainer>
        <ButtonsContainer>
          <AddEmployeeButton>
            Cadastrar funcionário
            <AddCircle color="white" />
          </AddEmployeeButton>
        </ButtonsContainer>

        <EmployeeLabelsContainer>
          <SecondLabelsContainer>
            <EmployeeLabel style={{ marginLeft: 10 }}>Nome</EmployeeLabel>
            <EmployeeLabel style={{ marginLeft: 100 }}>Funcional</EmployeeLabel>
            <EmployeeLabel style={{ marginLeft: 100 }}>Sexo</EmployeeLabel>
            <EmployeeLabel style={{ marginLeft: 100 }}>Cargo</EmployeeLabel>
            <EmployeeLabel style={{ marginLeft: 85 }}>CRF</EmployeeLabel>
            <EmployeeLabel style={{ marginLeft: 80 }}>Salário</EmployeeLabel>
          </SecondLabelsContainer>
          <EmployeeLabel style={{ marginRight: -15 }}>Ação</EmployeeLabel>
        </EmployeeLabelsContainer>
        {filteredEmployees.map((employee) => (
          <EmployeeCard>
            <EmployeeCommonInfo>
              <EmployeeName>{employee.nome}</EmployeeName>
            </EmployeeCommonInfo>
            <EmployeeCommonInfo>{employee.funcional}</EmployeeCommonInfo>
            <EmployeeCommonInfo>{employee.sexo}</EmployeeCommonInfo>
            <EmployeeCommonInfo>{employee.tipo_func}</EmployeeCommonInfo>
            <EmployeeCommonInfo>{employee.crf}</EmployeeCommonInfo>
            <EmployeeCommonInfo>{employee.salario}</EmployeeCommonInfo>
            <EmployeeEditContainer>
              <Edit color="primary" />
            </EmployeeEditContainer>
          </EmployeeCard>
        ))}
      </div>
    </Container>
  );
}
