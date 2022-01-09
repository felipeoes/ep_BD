import React, { useState, useEffect } from "react";
import { AddCircle, Edit } from "@mui/icons-material/";

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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Produtos() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProductsNames, setFilteredProductsNames] = useState([]);

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
                <ButtonsContainer>
                    <AddProductButton>
                        Cadastrar produto
                        <AddCircle color="white" />
                    </AddProductButton>
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
                {filteredProducts.map((product) => (
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
                        <ProductEditContainer>
                            <Edit color="primary" />
                        </ProductEditContainer>
                    </ProductCard>
                ))}
            </div>
        </Container>
    );
}
