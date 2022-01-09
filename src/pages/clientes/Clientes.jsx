import React, { useState, useEffect } from "react";
import { AddCircle, Edit } from "@mui/icons-material/";
import "./clientes.css";

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
} from "./styles.js";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Clientes() {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [filteredClientsNames, setFilteredClientsNames] = useState([]);

    useEffect(() => {
        async function loadClients() {
            try {
                api.defaults.headers.Authorization = "Basic ZmVsaXBlOjEyM2Zhcm1h";
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
    }

    return (
        <Container>
            <div className='content'>
                <AutocompleteContainer>
                    <Autocomplete
                        onSelect={(value) => {
                            handleOnSelect(value)
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
                <ButtonsContainer>
                    <AddClientButton>
                        Cadastrar cliente
                        <AddCircle color="white" />
                    </AddClientButton>
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
                {filteredClients.map((client) => (
                    <ClientCard>
                        <ClientCommonInfo>
                            <ClientName>{client.nome}</ClientName>
                        </ClientCommonInfo>
                        <ClientCommonInfo>{client.cpf}</ClientCommonInfo>
                        <ClientCommonInfo>{client.email}</ClientCommonInfo>
                        <ClientCommonInfo>{client.sexo}</ClientCommonInfo>
                        <ClientCommonInfo>{client.data_nascimento.split('-').reverse().join('/')}</ClientCommonInfo>
                        <ClientCommonInfo>{client.id_beneficios}</ClientCommonInfo>
                        <ClientEditContainer>
                            <Edit color="primary" />
                        </ClientEditContainer>
                    </ClientCard>
                ))}
            </div>
        </Container>
    );
}
