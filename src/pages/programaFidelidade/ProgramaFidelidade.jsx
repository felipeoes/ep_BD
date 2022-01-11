import React, { useState, useEffect } from "react";
import { AddCircle, Edit } from "@mui/icons-material/";
import { Link } from "react-router-dom";
import AutoScrollContainer from "auto-scroll-container";

import api from "../../services/api";
import { toast } from "react-toastify";
import "./programaFidelidade.css";

import {
    Container,
    AutocompleteContainer,
    AddProductButton,
    ButtonsContainer,
    ProductLabelsContainer,
    ProductLabel,
    ProductCard,
    ProductPhotoContainer,
    ProductMainInfoContainer,
    ProductName,
    ProductCategoryContainer,
    ProductCommonInfo,
    ProductEditContainer,
    SecondLabelsContainer,
} from "./styles.js";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ServicesModal from "../../components/modal/Modal";
import PaginatedItems from "../../components/paginate/Paginate";
import Loading from "../../components/loading/Loading";
import CreateProgramaFidelidade from './create';

export default function Produtos() {
    const [programs, setProgramas] = useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [filteredProgramName, setFilteredProgramName] = useState([]);

    const [childModalFunction, setChildModalFunction] = useState(null);

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    useEffect(() => {
        async function loadProducts() {
            try {
                api.defaults.headers.Authorization = "Basic ZmVsaXBlOjEyM2Zhcm1h";
                const response = await api.get(`programa-beneficios/`);

                console.log(response);
                const programs = response.data.results;
                setProgramas([...programs]);
                setFilteredPrograms(programs);

                // populateStock(products);
                populateData(programs);
            } catch (error) {
                toast.error("Não foi possível pesquisar os serviços!");
                console.log("erro");
                console.log(error);
            }
        }
        loadProducts();
    }, []);

    function getProgramsNames() {
        const names = [];
        programs.map((program) => {
            names.push(program.nome);
        });
        return names;
    }

    function populateData(products) {
        const programNames = [];
        programs.map((product) => {
            programNames.push(product.nome);
        });
        setFilteredProgramName(programNames);
    }

    function handleOnSelect(program) {
        setSelectedProgram(program);
    }

    const findProgram = (program) => {
        if (program) {
            const regex = new RegExp(`${program.trim()}`, "i");
            setFilteredProgramName(
                filteredProgramName.filter((program) => program.search(regex) >= 0)
            );
            setFilteredPrograms(
                filteredPrograms.filter((program) => program.nome.search(regex) >= 0)
            );
        } else {
            setFilteredProgramName(getProgramsNames());
            setFilteredPrograms(programs);
        }
        console.log(setFilteredProgramName);
    };

    function ReactElementItem({ currentItem }) {
        return (
            <>
                <ProductCard>
                    <ProductMainInfoContainer>
                        <ProductName>{currentItem.nome}</ProductName>
                    </ProductMainInfoContainer>
                    <ProductCategoryContainer>
                        <ProductCommonInfo>{currentItem.descricao} %</ProductCommonInfo>
                    </ProductCategoryContainer>
                    <ProductCommonInfo>{currentItem.fator_desconto} %</ProductCommonInfo>
                    <Link to="/update-prod">
                        <ProductEditContainer>
                            <Edit color="primary" />
                        </ProductEditContainer>
                    </Link>
                </ProductCard>
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
                            onInputChange={(event, value) => findProgram(value)}
                            options={filteredProgramName}
                            size="small"
                            placeholder="Digite o nome do programa"
                            style={{
                                width: 271,
                                border: 0,
                                height: 38,
                                backgroundColor: "white",
                            }}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    placeholder="Digite o nome do programa"
                                    style={{
                                        width: 271,
                                        height: 38,
                                        backgroundColor: "white",
                                    }}
                                    {...params}
                                    label="Programa"
                                ></TextField>
                            )}
                        />
                        <h2>Programas de Benefícios FarmaUSP</h2>
                    </AutocompleteContainer>
                    <ServicesModal
                        headerTitle="Cadastrar Programa de Fidelidade"
                        ModalContent={CreateProgramaFidelidade}
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
                            Cadastrar Programa
                            <AddCircle color="white" />
                        </AddProductButton>
                        {/* </Link> */}
                    </ButtonsContainer>

                    <ProductLabelsContainer>
                        <div style={{ display: 'flex', width: 500 }}>
                            <ProductLabel style={{ marginLeft: 160 }}>
                                Nome do Programa
                            </ProductLabel>
                        </div>

                        <SecondLabelsContainer>

                            <ProductLabel style={{ marginLeft: 10 }}>Descricao</ProductLabel>
                            <ProductLabel style={{ marginLeft: 70 }}>fator Desconto</ProductLabel>
                        </SecondLabelsContainer>

                        <ProductLabel style={{ marginLeft: 150 }}>Ação</ProductLabel>
                    </ProductLabelsContainer>

                    {filteredPrograms ? (
                        <PaginatedItems
                            itemsPerPage={3}
                            items={filteredPrograms}
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

                    {/* {filteredProducts.map((product) => (
          <ProductCard>
            <ProductMainInfoContainer>
              <ProductPhotoContainer>
                <img
                  style={{ width: "70%", height: "70%", borderRadius: "15%" }}
                  alt="rndPic"
                  src={product.image}
                />
              </ProductPhotoContainer>
              <ProductName>{product.nome}</ProductName>
            </ProductMainInfoContainer>
            <ProductCategoryContainer>
              {product.categoria}
            </ProductCategoryContainer>
            <ProductCommonInfo>{product.stock}</ProductCommonInfo>
            <ProductCommonInfo>R${product.preco}</ProductCommonInfo>
            <Link to="/update-prod">
              <ProductEditContainer>
                <Edit color="primary" />
              </ProductEditContainer>
            </Link>
          </ProductCard>
        ))} */}
                </div>
            </AutoScrollContainer>
        </Container>
    );
}
