import React, { useState, useEffect } from "react";
import { AddCircle, Edit } from "@mui/icons-material/";
import "./clientes.css";

import AutoScrollContainer from "auto-scroll-container";
import ServicesModal from "../../components/modal/Modal";

import api from "../../services/api";
import { toast } from "react-toastify";

import {
  Container,
  AutocompleteContainer,
  AddClientButton,
  ButtonsContainer,
  ClientLabelsContainer,
  ClientLabel,
  ClientCard,
  ClientName,
  ClientCommonInfo,
  ClientEditContainer,
  SecondLabelsContainer,
  AddProductButton,
  ClientCPFContainer,
} from "./styles.js";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import PaginatedItems from "../../components/paginate/Paginate";
import Loading from "../../components/loading/Loading";
import CreateCliente from "./create";

export default function Clientes() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filteredClientsNames, setFilteredClientsNames] = useState([]);
  const [childModalFunction, setChildModalFunction] = useState(null);

  useEffect(() => {
    async function loadClients() {
      try {
        const response = await api.get(`clientes/`);

        console.log(response);
        const clients = response.data.results;
        setClients([...clients]);
        setFilteredClients(clients);

        populateData(clients);
      } catch (error) {
        toast.error("Não foi possível pesquisar os clientes!");
        console.log("erro");
        console.log(error);
      }
    }
    loadClients();
  }, []);

  function getClientNames() {
    const names = [];
    clients.map((client) => {
      names.push(client.nome);
    });
  }

  function populateData(clients) {
    const clientNames = [];
    clients.map((client) => {
      clientNames.push(client.nome);
    });
    setFilteredClientsNames(clientNames);
  }

  function handleOnSelect(client) {
    setSelectedClient(client);
  }

  const findClient = (client) => {
    if (client) {
      const regex = new RegExp(`${client.trim()}`, "i");
      setFilteredClientsNames(
        filteredClientsNames.filter((client) => client.search(regex) >= 0)
      );
      setFilteredClients(
        filteredClients.filter((client) => client.nome.search(regex) >= 0)
      );
    } else {
      setFilteredClientsNames(getClientNames());
      setFilteredClients(clients);
    }
    console.log(filteredClientsNames);
  };

  function ReactElementItem({ currentItem }) {
    return (
      <>
        <ClientCard>
          <ClientCommonInfo>
            <ClientName>{currentItem.nome}</ClientName>
          </ClientCommonInfo>
          <ClientCPFContainer>
            <ClientCommonInfo>{currentItem.cpf}</ClientCommonInfo>
          </ClientCPFContainer>

          <ClientCommonInfo style={{ width: 150 }}>
            {currentItem.email}
          </ClientCommonInfo>
          <ClientCommonInfo>{currentItem.sexo}</ClientCommonInfo>
          <ClientCommonInfo>
            {currentItem.data_nascimento.split("-").reverse().join("/")}
          </ClientCommonInfo>
          <ClientCommonInfo>{currentItem.id_beneficios}</ClientCommonInfo>
          <ClientEditContainer>
            <Edit color="primary" />
          </ClientEditContainer>
        </ClientCard>
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
              onInputChange={(event, value) => findClient(value)}
              options={filteredClientsNames}
              size="small"
              placeholder="Digite o nome do cliente"
              style={{
                width: 271,
                border: 0,
                height: 38,
                backgroundColor: "white",
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  placeholder="Digite o nome do cliente"
                  style={{
                    width: 271,
                    height: 38,
                    backgroundColor: "white",
                  }}
                  {...params}
                  label="Cliente"
                ></TextField>
              )}
            />
            <h2> Clientes FarmaUSP </h2>
          </AutocompleteContainer>
          <ServicesModal
            headerTitle="Cadastrar Cliente"
            ModalContent={CreateCliente}
            setModalFunction={(f) => {
              setChildModalFunction(f);
            }}
          />
          <ButtonsContainer>
            {/* <Link to="/create-prod"> */}
            <AddProductButton
              onClick={() => {
                childModalFunction();
              }}
            >
              Cadastrar Cliente
              <AddCircle color="white" />
            </AddProductButton>
            {/* </Link> */}
          </ButtonsContainer>

          <ClientLabelsContainer>
            <SecondLabelsContainer>
              <ClientLabel style={{ marginLeft: 10 }}>Nome</ClientLabel>
              <ClientLabel style={{ marginLeft: 150 }}>CPF</ClientLabel>
              <ClientLabel style={{ marginLeft: 150 }}>Email</ClientLabel>
              <ClientLabel style={{ marginLeft: 190 }}>Sexo</ClientLabel>
              <ClientLabel style={{ marginLeft: 85 }}>Nascimento</ClientLabel>
              <ClientLabel style={{ marginLeft: 80 }}>Benefício</ClientLabel>
            </SecondLabelsContainer>
            <ClientLabel style={{ marginRight: -15 }}>Ação</ClientLabel>
          </ClientLabelsContainer>

          {filteredClients ? (
            <PaginatedItems
              itemsPerPage={3}
              items={filteredClients}
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
    </Container>
  );
}
