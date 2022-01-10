import React, { useState, useEffect } from "react";
import api from "../../../services/api";

// import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const names = [
  "Sup. Biotina",
  "Colgate Extreme",
  "Imovane",
  "Flagyl",
  "Escova de Dentes",
];
export default function ListTop5Products(props) {
  const [top5Products, setTop5Products] = useState([]);
  // const [productsNames, setProductsNames] = useState([]);

  const productsNames = props.data; // array com nomes dos produtos
  console.log(productsNames);
  useEffect(() => {
    loadTop5Products();
  }, []);

  async function loadTop5Products() {
    try {
      api.defaults.headers.Authorization = "Basic ZmVsaXBlOjEyM2Zhcm1h";
      const response = await api.get(`top5-produtos/`);

      const products = response.data.results;

      console.log(products);
      let name = "";
      let value = 0;
      const productsObj = [];
      let i = 0;
      products.forEach((product) => {
        name = names[i];
        // name = product.codigo_barras;
        value = product.quantidade * 12;

        productsObj.push({ name, value });
        i++;
      });

      console.log(productsObj);
      setTop5Products(productsObj);
    } catch (error) {
      toast.error("Não foi possível encontrar os top5 produtos");
      console.log(error);
    }
  }

  return top5Products;
}
