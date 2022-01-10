import React, { useState, useEffect } from "react";
import { AddCircle, Edit } from "@mui/icons-material/";
import { Link } from "react-router-dom";

import api from "../../services/api";
import { toast } from "react-toastify";
import "./produtos.css";
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

import CreateProduto from "./create/index";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ServicesModal from "../../components/modal/Modal";
import PaginatedItems from "../../components/paginate/Paginate";
import Loading from "../../components/loading/Loading";
import AutoScrollContainer from "auto-scroll-container";
import UpdateProduto from "./update/index";

export default function Produtos() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProductsNames, setFilteredProductsNames] = useState([]);
  const [childModalFunction, setChildModalFunction] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        api.defaults.headers.Authorization = "Basic ZmVsaXBlOjEyM2Zhcm1h";
        const response = await api.get(`produtos/`);

        console.log(response);
        const products = response.data.results;
        setProducts([...products]);
        setFilteredProducts(products);

        populateStock(products);
        populateData(products);
      } catch (error) {
        toast.error("Não foi possível pesquisar os serviços!");
        console.log("erro");
        console.log(error);
      }
    }
    loadProducts();
  }, []);

  function populateStock(products) {
    var number = 0;
    products.map((product, index) => {
      number = Math.floor(Math.random() * 10 + 20);
      product.stock = number;
      product.image = `https://source.unsplash.com/1600x900/?product/${index}`;
    });
  }

  function getProductNames() {
    const names = [];
    products.map((product) => {
      names.push(product.nome);
    });
    return names;
  }

  function populateData(products) {
    const productNames = [];
    products.map((product) => {
      productNames.push(product.nome);
    });
    setFilteredProductsNames(productNames);
  }

  function handleOnSelect(product) {
    setSelectedProduct(product);
  }
  const findProduct = (product) => {
    if (product) {
      const regex = new RegExp(`${product.trim()}`, "i");
      setFilteredProductsNames(
        filteredProductsNames.filter((product) => product.search(regex) >= 0)
      );
      setFilteredProducts(
        filteredProducts.filter((product) => product.nome.search(regex) >= 0)
      );
    } else {
      setFilteredProductsNames(getProductNames());
      setFilteredProducts(products);
    }
    console.log(filteredProductsNames);
  };

  function ReactElementItem({ currentItem }) {
    const [childModalFunction, setChildModalFunction] = useState(null);

    return (
      <>
        <ServicesModal
          headerTitle="Atualizar produto"
          ModalContent={UpdateProduto}
          setModalFunction={(f) => {
            setChildModalFunction(f);
          }}
        />

        <ProductCard>
          <ProductMainInfoContainer>
            <ProductPhotoContainer>
              <img
                style={{ width: "70%", height: "70%", borderRadius: "15%" }}
                alt="rndPic"
                src={currentItem.image}
              />
            </ProductPhotoContainer>
            <ProductName>{currentItem.nome}</ProductName>
          </ProductMainInfoContainer>
          <ProductCategoryContainer>
            <ProductCommonInfo>{currentItem.categoria}</ProductCommonInfo>
          </ProductCategoryContainer>
          <ProductCommonInfo>{currentItem.stock}</ProductCommonInfo>
          <ProductCommonInfo>R${currentItem.preco}</ProductCommonInfo>
          <Link to="/update-prod">
          <ProductEditContainer
            onClick={() => {
              childModalFunction();
            }}
          >
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
              classPrefix="auto-complete"
              onInputChange={(event, value) => findProduct(value)}
              options={filteredProductsNames}
              size="small"
              placeholder="Digite o nome do produto"
              style={{
                width: 271,
                border: 0,
                height: 38,
                backgroundColor: "white",
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  placeholder="Digite o nome do produto"
                  style={{
                    width: 271,
                    height: 38,
                    backgroundColor: "white",
                  }}
                  {...params}
                  label="Produto"
                ></TextField>
              )}
            />
            <h2>Produtos FarmaUSP</h2>
          </AutocompleteContainer>
          <ServicesModal
            headerTitle="Cadastrar produto"
            ModalContent={CreateProduto}
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
              Cadastrar produto
              <AddCircle color="white" />
            </AddProductButton>
            {/* </Link> */}
          </ButtonsContainer>

          <ProductLabelsContainer>
            <div>
              <ProductLabel style={{ marginLeft: -5 }}>
                Detalhes do produto
              </ProductLabel>
            </div>

            <SecondLabelsContainer>
              <ProductLabel style={{ marginLeft: 75 }}>Categoria</ProductLabel>
              <ProductLabel style={{ marginLeft: 75 }}>Estoque</ProductLabel>
              <ProductLabel style={{ marginLeft: 65 }}>Preço</ProductLabel>
            </SecondLabelsContainer>

            <ProductLabel style={{ marginRight: 10 }}>Ação</ProductLabel>
          </ProductLabelsContainer>

          {filteredProducts ? (
            <PaginatedItems
              itemsPerPage={3}
              items={filteredProducts}
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
