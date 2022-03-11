import { useState, useEffect } from "react";
import api, { authorization } from "../../../services/api";
import { toast } from "react-toastify";

const names = ["Maxit", "Oliver peças", "Susienne", "Mappit", "Lorenzetti"];

export default function ListTop5Suppliers(props) {
  const [top5Suppliers, setTop5Suppliers] = useState([]);

  useEffect(() => {
    loadTop5Suppliers();
  }, []);

  async function loadTop5Suppliers() {
    try {
      const response = await api.get(`top5-fornecedores/`);

      const suppliers = response.data.results;
      console.log(suppliers);

      let name = "";
      let value = 0;
      const productsObj = [];
      let i = 0;
      suppliers.forEach((supplier) => {
        name = names[i];
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
