import React, { useState, useEffect } from "react";
import api from "../../../services/api";

// import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const names = [
  "Maxit",
  "Oliver peças",
  "Susienne",
  "Mappit",
  "Lorenzetti",
];
export default function ListTop5Suppliers(props) {
  const [top5Suppliers, setTop5Suppliers] = useState([]);
  // const [productsNames, setProductsNames] = useState([]);

  useEffect(() => {
    loadTop5Suppliers();
  }, []);

  async function loadTop5Suppliers() {
    try {
      api.defaults.headers.Authorization = "Basic ZmVsaXBlOjEyM2Zhcm1h";
      const response = await api.get(`top5-fornecedores/`);

      const suppliers = response.data.results;
      console.log(suppliers);

      let name = "";
      let value = 0;
      const productsObj = [];
      let i = 0;
      suppliers.forEach((supplier) => {
        name = names[i];
        // name = product.codigo_barras;
        value = supplier.valor_total;

        productsObj.push({ name, value });
        i++;
      });

      console.log(productsObj);
      setTop5Suppliers(productsObj);
    } catch (error) {
      toast.error("Não foi possível encontrar os top5 produtos");
      console.log(error);
    }
  }

  return top5Suppliers;
}
