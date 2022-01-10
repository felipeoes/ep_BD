import React, { useState, useEffect } from "react";
import { AddCircle, Edit } from "@mui/icons-material/";

import "./funcionarios.css";

import api from "../../services/api";
import { toast } from "react-toastify";
import AutoScrollContainer from "auto-scroll-container";

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
import ServicesModal from "../../components/modal/Modal";
import PaginatedItems from "../../components/paginate/Paginate";
import Loading from "../../components/loading/Loading";

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

  function ReactElementItem({ currentItem }) {
    return (
      <>
        <EmployeeCard>
          <EmployeeCommonInfo style={{ width: 190 }}>
            <EmployeeName>{currentItem.nome}</EmployeeName>
          </EmployeeCommonInfo>
          <EmployeeCommonInfo>{currentItem.funcional}</EmployeeCommonInfo>
          <EmployeeCommonInfo>{currentItem.sexo}</EmployeeCommonInfo>
          <EmployeeCommonInfo>{currentItem.tipo_func}</EmployeeCommonInfo>
          <EmployeeCommonInfo>{currentItem.crf}</EmployeeCommonInfo>
          <EmployeeCommonInfo>{currentItem.salario}</EmployeeCommonInfo>
          <EmployeeEditContainer>
            <Edit color="primary" />
          </EmployeeEditContainer>
        </EmployeeCard>
      </>
    );
  }

  return (
    <Container>
      <AutoScrollContainer
        className="my-scroll-style"
        marginTop={0}
        marginBottom={0.1}
      >
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
              <EmployeeLabel style={{ marginLeft: 40 }}>Nome</EmployeeLabel>
              <EmployeeLabel style={{ marginLeft: 180 }}>Funcional</EmployeeLabel>
              <EmployeeLabel style={{ marginLeft: 90 }}>Sexo</EmployeeLabel>
              <EmployeeLabel style={{ marginLeft: 110 }}>Cargo</EmployeeLabel>
              <EmployeeLabel style={{ marginLeft: 120 }}>CRF</EmployeeLabel>
              <EmployeeLabel style={{ marginLeft: 100 }}>Salário</EmployeeLabel>
            </SecondLabelsContainer>
            <EmployeeLabel style={{ marginRight: -15 }}>Ação</EmployeeLabel>
          </EmployeeLabelsContainer>

          {filteredEmployees ? (
            <PaginatedItems
              itemsPerPage={3}
              items={filteredEmployees}
              ReactElementItem={ReactElementItem}
            />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10%",
              }}
            >
              <Loading width={150} height={150} />
            </div>
          )}
        </div>
      </AutoScrollContainer>
    </Container >
  );
}
