import React, { useState, useEffect } from "react";
import api from "../../../services/api";

// import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const months = {
  0: "Janeiro",
  1: "Fevereiro",
  2: "Março",
  3: "Abril",
  4: "Maio",
  5: "Junho",
  6: "Julho",
  7: "Agosto",
  8: "Setembro",
  9: "Outubro",
  10: "Novembro",
  11: "Dezembro",
};

function ListCompras() {
  // let navigate = useNavigate();

  const [responses, setResponse] = useState([]);
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    let r = [],
      url = "compras/";
    async function loadPurchases() {
      try {
        api.defaults.headers.Authorization = "Basic ZmVsaXBlOjEyM2Zhcm1h";
        const response = await api.get(url);

        r.push(response);
        if (response.data.next) {
          const page = Number(response.data.next.split("=").pop());
          url = `compras/?page=${page}`;
          loadPurchases();
        } else {
          setResponse(r);
        }
      } catch (error) {
        toast.error("Não foi possível listar as compras!");
        console.log(error);
      }
    }
    loadPurchases();
  }, []);

  const purchases = [];
  const medias = [];
  if (responses.length) {
    responses.map((item) => {
      item.data.results.forEach((arr) => {
        purchases.push(arr);
      });
    });

    const delta = purchases.length / 5;
    let arr = [];
    let ind = 0;
    let accumulated = 0;
    while (purchases.length) {
      const array = purchases.splice(0, delta);
      let total = 0;
      array.forEach((item) => {
        total += item.total;
      });

      accumulated += total;
      arr.push({
        name: months[ind],
        presente: total,
        acumulado: accumulated,
        media: total / array.length,
      });
      ind++;
    }

    if (!compras.length) {
      setCompras(arr);
    }
  }

  return compras;
}

export default ListCompras;
