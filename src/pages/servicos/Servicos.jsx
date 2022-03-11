import React, { useState, useEffect } from "react";
import "./servicos.css"
import AutoScrollContainer from "auto-scroll-container";
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
    AddProductButton
} from "./styles.js";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ServicesModal from "../../components/modal/Modal";
import PaginatedItems from "../../components/paginate/Paginate";
import Loading from "../../components/loading/Loading";
import CreateServico from "./create";

export default function Servicos() {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [selectedService, setSelectedService] = useState([]);
    const [filteredServicesNames, setFilteredServicesNames] = useState([]);
    const [childModalFunction, setChildModalFunction] = useState(null);

    useEffect(() => {
        async function loadServices() {
            try {
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

    function ReactElementItem({ currentItem }) {
        return (
            <>
                <ServiceCard>
                    <ServiceCommonInfo>
                        <ServiceId>{currentItem.id}</ServiceId>
                    </ServiceCommonInfo>
                    <ServiceCommonInfo style={{ width: 150 }}>{currentItem.nome}</ServiceCommonInfo>
                    <ServiceCommonInfo style={{ width: 20 }}> {currentItem.preco}</ServiceCommonInfo>
                    <ServiceCommonInfo>{currentItem.descricao}</ServiceCommonInfo>
                    <ServiceEditContainer>
                        <Edit color="primary" />
                    </ServiceEditContainer>
                </ServiceCard>
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
                    <ServicesModal
                        headerTitle="Cadastrar produto"
                        ModalContent={CreateServico}
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
                            Cadastrar Serviço
                            <AddCircle color="white" />
                        </AddProductButton>
                        {/* </Link> */}
                    </ButtonsContainer>

                    <ServiceLabelsContainer>
                        <div style={{ display: 'flex', width: 500 }}>
                            <ServiceLabel style={{ marginLeft: 0 }}>
                                Id do serviço
                            </ServiceLabel>
                        </div>
                        <SecondLabelsContainer>
                            <ServiceLabel style={{ marginLeft: -270 }}>Nome</ServiceLabel>
                            <ServiceLabel style={{ marginLeft: 50 }}>Preço</ServiceLabel>
                            <ServiceLabel style={{ marginRight: 180 }}>Descrição</ServiceLabel>
                        </SecondLabelsContainer>
                        <ServiceLabel style={{ marginRight: -15 }}>Ação</ServiceLabel>
                    </ServiceLabelsContainer>
                    {filteredServices ? (
                        <PaginatedItems
                            itemsPerPage={3}
                            items={filteredServices}
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
    )
}
