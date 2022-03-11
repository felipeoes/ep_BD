import React, { useState, useEffect } from "react";
import { AddCircle, Edit } from "@mui/icons-material/";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
  ProductMainLabelContainer,
  SecondLabelsContainer,
  ContentContainer,
  ProductCardContainer,
} from "./styles.js";

import CreateProduto from "./create/index";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ServicesModal from "../../components/modal/Modal";
import PaginatedItems from "../../components/paginate/Paginate";
import Loading from "../../components/loading/Loading";
import UpdateProduto from "./update/index";
import GetItems, { fetchItems } from "./../../services/utils/getItems";

export default function Produtos(props) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProductsNames, setFilteredProductsNames] = useState([]);
  const [childModalFunction, setChildModalFunction] = useState(null);

  let url = "produtos/";

  async function loadProducts() {
    const fetchedProducts = await fetchItems(url);
    populateStock(fetchedProducts);

    console.log(fetchedProducts);
    setProducts(fetchedProducts);
    populateData(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  }

  useEffect(() => {
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
    const [refresh, setRefresh] = useState(false);

    function updateProduct(product) {
      currentItem.nome = product.nome;
      currentItem.categoria = product.categoria;
      currentItem.preco = product.preco;
      setRefresh(!refresh);
    }

    return (
      <ProductCardContainer>
        <ServicesModal
          loadItems={loadProducts}
          updateItem={updateProduct}
          headerTitle="Atualizar produto"
          ModalContent={UpdateProduto}
          item={currentItem}
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
          <ProductEditContainer
            onClick={() => {
              childModalFunction();
            }}
          >
            <Edit color="primary" />
          </ProductEditContainer>
        </ProductCard>
      </ProductCardContainer>
    );
  }
  return (
    <Container>
      <ContentContainer>
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

          <ButtonsContainer>
            <AddProductButton
              onClick={() => {
                childModalFunction();
              }}
            >
              Cadastrar produto
              <AddCircle color="white" style={{ marginLeft: 5 }} />
            </AddProductButton>
          </ButtonsContainer>
        </AutocompleteContainer>
      </ContentContainer>

      <ServicesModal
        loadItems={loadProducts}
        headerTitle="Cadastrar produto"
        ModalContent={CreateProduto}
        setModalFunction={(f) => {
          setChildModalFunction(f);
        }}
      />

      <ProductLabelsContainer>
        <ProductMainLabelContainer>
          <ProductLabel>Foto</ProductLabel>

          <ProductLabel>Nome</ProductLabel>
        </ProductMainLabelContainer>

        <ProductLabel style={{ marginLeft: "3%" }}>Categoria</ProductLabel>
        <ProductLabel>Estoque</ProductLabel>
        <ProductLabel>Preço</ProductLabel>

        <ProductLabel style={{ marginRight: 28 }}>Ação</ProductLabel>
      </ProductLabelsContainer>

      {filteredProducts ? (
        <div style={{ width: "85%" }}>
          <PaginatedItems
            itemsPerPage={3}
            items={filteredProducts}
            ReactElementItem={ReactElementItem}
          />
        </div>
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
    </Container>
  );
}
