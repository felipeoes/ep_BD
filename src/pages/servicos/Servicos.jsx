import React, { useState, useEffect } from "react";
import "./servicos.css"

import { MedicalServices, Ballot, AddCircle, Edit, Search } from '@mui/icons-material/';


import api from "../../services/api";
import { toast } from "react-toastify";

import {
    Container,
    AutocompleteContainer,
    AddServiceButton,
    ButtonsContainer,
    ServiceLabelsContainer,
    ServiceLabel,
    ServiceCard,
    ServiceId,
    ServiceCommonInfo,
    ServiceEditContainer,
    SecondLabelsContainer,
} from "./styles.js";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Servicos() {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [selectedService, setSelectedService] = useState([]);
    const [filteredServicesNames, setFilteredServicesNames] = useState([]);

    useEffect(() => {
        async function loadServices() {
            try {
                api.defaults.headers.Authorization = "Basic ZmVsaXBlOjEyM2Zhcm1h";
                const response = await api.get(`servicos/`);

                console.log(response);
                const services = response.data.results;
                setServices([...services]);
                setFilteredServices(services);

                populateData(services);
            } catch (error) {
                toast.error("Não foi possível pesquisar os serviços!");
                console.log("erro");
                console.log(error);
            }
        }
        loadServices();
    }, []);

    function getServiceNames() {
        const names = [];
        services.map((service) => {
            names.push(service.nome);
        });
    }

    function populateData(services) {
        const serviceNames = [];
        services.map((service) => {
            serviceNames.push(service.nome);
        });
        setFilteredServicesNames(serviceNames);
    }

    function handleOnSelect(service) {
        setSelectedService(service);
    }

    const findService = (service) => {
        if (service) {
            const regex = new RegExp(`${service.trim()}`, "i");
            setFilteredServicesNames(
                filteredServicesNames.filter((service) => service.search(regex) >= 0)
            );
            setFilteredServices(
                filteredServices.filter((service) => service.nome.search(regex) >= 0)
            );
        } else {
            setFilteredServicesNames(getServiceNames());
            setFilteredServices(service);
        }
        console.log(filteredServicesNames);
    }

    console.log(filteredServices);

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
                        onInputChange={(event, value) => findService(value)}
                        options={filteredServicesNames}
                        size="small"
                        placeholder="Digite o nome do serviço"
                        style={{
                            width: 271,
                            border: 0,
                            height: 38,
                            backgroundColor: "white",
                        }}
                        renderInput={(params) => (
                            <TextField
                                variant="outlined"
                                placeholder="Digite o nome do serviço"
                                style={{
                                    width: 271,
                                    height: 38,
                                    backgroundColor: "white",
                                }}
                                {...params}
                                label="Serviço"
                            ></TextField>
                        )}
                    />
                    <h2> Serviços FarmaUSP </h2>
                </AutocompleteContainer>
                <ButtonsContainer>
                    <AddServiceButton>
                        Cadastrar serviço
                        <AddCircle color="white" />
                    </AddServiceButton>
                </ButtonsContainer>

                <ServiceLabelsContainer>
                    <SecondLabelsContainer>
                        <ServiceLabel style={{ marginLeft: 10 }}>Id</ServiceLabel>
                        <ServiceLabel style={{ marginLeft: 150 }}>Nome</ServiceLabel>
                        <ServiceLabel style={{ marginLeft: 150 }}>Preço</ServiceLabel>
                        <ServiceLabel style={{ marginLeft: 190 }}>Descrição</ServiceLabel>
                    </SecondLabelsContainer>
                    <ServiceLabel style={{ marginRight: -15 }}>Ação</ServiceLabel>
                </ServiceLabelsContainer>
                {filteredServices.map((service) => (
                    <ServiceCard>
                        <ServiceCommonInfo>
                            <ServiceId>{service.id}</ServiceId>
                        </ServiceCommonInfo>
                        <ServiceCommonInfo>{service.nome}</ServiceCommonInfo>
                        <ServiceCommonInfo>{service.preco}</ServiceCommonInfo>
                        <ServiceCommonInfo>{service.descricao}</ServiceCommonInfo>
                        <ServiceEditContainer>
                            <Edit color="primary" />
                        </ServiceEditContainer>
                    </ServiceCard>
                ))}
            </div>
        </Container>
    )
}


