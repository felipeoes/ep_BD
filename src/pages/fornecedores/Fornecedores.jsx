import React, { useState, useEffect } from "react";
import { AddCircle, Edit } from "@mui/icons-material/";
import { Link } from "react-router-dom";
import AutoScrollContainer from "auto-scroll-container";

import api from "../../services/api";
import { toast } from "react-toastify";
import "./fornecedores.css";

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
import CreateFornecedor from "./create";

export default function Produtos() {
  const [fornecedores, setFornecedores] = useState([]);
  const [filteredFornecedores, setFilteredFornecedores] = useState([]);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  const [filteredFornecedorName, setFilteredFornecedorName] = useState([]);

  const [childModalFunction, setChildModalFunction] = useState(null);

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  useEffect(() => {
    async function loadProducts() {
      try {
        api.defaults.headers.Authorization = "Basic ZmVsaXBlOjEyM2Zhcm1h";
        const response = await api.get(`fornecedores/`);

        console.log(response);
        const fornecedores = response.data.results;
        setFornecedores([...fornecedores]);
        setFilteredFornecedores(fornecedores);

        // populateStock(products);
        populateData(fornecedores);
      } catch (error) {
        toast.error("Não foi possível pesquisar os fornecedores!");
        console.log("erro");
        console.log(error);
      }
    }
    loadProducts();
  }, []);

  function getFornecedorNames() {
    const names = [];
    fornecedores.map((fornecedores) => {
      names.push(fornecedores.razao_social);
    });
    return names;
  }

  function populateData(fornecedores) {
    const fornecedoresNames = [];
    fornecedores.map((fornecedor) => {
      fornecedoresNames.push(fornecedor.razao_social);
    });
    setFilteredFornecedorName(fornecedoresNames);
  }

  function handleOnSelect(fornecedor) {
    setSelectedFornecedor(fornecedor);
  }

  const findProgram = (fornecedor) => {
    if (fornecedor) {
      const regex = new RegExp(`${fornecedor.trim()}`, "i");
      setFilteredFornecedorName(
        filteredFornecedorName.filter(
          (fornecedor) => fornecedor.search(regex) >= 0
        )
      );
      setFilteredFornecedores(
        filteredFornecedores.filter(
          (fornecedor) => fornecedor.razao_social.search(regex) >= 0
        )
      );
    } else {
      setFilteredFornecedorName(getFornecedorNames());
      setFilteredFornecedores(fornecedores);
    }
    console.log(filteredFornecedorName);
  };

  function ReactElementItem({ currentItem }) {
    return (
      <>
        <ProductCard>
          <ProductMainInfoContainer>
            <ProductName>{currentItem.razao_social}</ProductName>
          </ProductMainInfoContainer>
          <ProductCategoryContainer>
            <ProductCommonInfo>{currentItem.cnpj}</ProductCommonInfo>
          </ProductCategoryContainer>
          <ProductCategoryContainer>
            <ProductCommonInfo>{currentItem.email}</ProductCommonInfo>
          </ProductCategoryContainer>
          <ProductCategoryContainer>
            <ProductCommonInfo>{currentItem.endereco}</ProductCommonInfo>
          </ProductCategoryContainer>
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
              options={filteredFornecedorName}
              size="small"
              placeholder="Digite o nome do fornecedor"
              style={{
                width: 271,
                border: 0,
                height: 38,
                backgroundColor: "white",
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  placeholder="Digite o nome do fornecedor"
                  style={{
                    width: 271,
                    height: 38,
                    backgroundColor: "white",
                  }}
                  {...params}
                  label="Fornecedor"
                ></TextField>
              )}
            />
            <h2>Fornecedores</h2>
          </AutocompleteContainer>
          <ServicesModal
            headerTitle="Cadastrar Fornecedor"
            ModalContent={CreateFornecedor}
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
              Cadastrar Fornecedor
              <AddCircle color="white" />
            </AddProductButton>
            {/* </Link> */}
          </ButtonsContainer>

          <ProductLabelsContainer>
            <div style={{ display: "flex", width: 500 }}>
              <ProductLabel style={{ marginLeft: 160 }}>
                Nome do Fornecedor
              </ProductLabel>
            </div>

            <SecondLabelsContainer>
              <ProductLabel style={{ marginLeft: -60 }}>CNPJ</ProductLabel>
              <ProductLabel style={{ marginLeft: 70 }}>Endereço</ProductLabel>
              <ProductLabel style={{ marginLeft: 70 }}>E-mail</ProductLabel>
            </SecondLabelsContainer>

            <ProductLabel style={{ marginLeft: 150 }}>Ação</ProductLabel>
          </ProductLabelsContainer>

          {filteredFornecedores ? (
            <PaginatedItems
              itemsPerPage={3}
              items={filteredFornecedores}
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
