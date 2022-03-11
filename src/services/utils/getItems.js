import { useState, useEffect } from "react";
import api from "../api";

function GetItems(url) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    let res = [],
      currentURL = url;
    async function loadItems() {
      try {
        let response = await api.get(url);
        res.push(response);

        while (response.data.next) {
          const page = Number(response.data.next.split("=").pop());
          currentURL = `${url}?page=${page}`;

          response = await api.get(currentURL);
          res.push(response);

          setResponses([...res, response]);
        }

        setResponses([...res, response]);
      } catch (error) {
        console.log(error);
      }
    }
    loadItems();
  }, []);

  let items = [];
  if (responses.length) {
    console.log(responses);
    responses.map((item) => {
      item.data.results.forEach((arr) => {
        items.push(arr);
      });
    });
  }

  return items;
}

export async function fetchItems(url) {
  let res = [],
    items = [],
    currentURL = url;

  async function loadPurchases() {
    try {
      let response = await api.get(url);
      res.push(response);

      while (response.data.next) {
        const page = Number(response.data.next.split("=").pop());
        currentURL = `${url}?page=${page}`;

        response = await api.get(currentURL);
        res.push(response);
      }

      console.log(res);

      if (res.length) {
        console.log(res);
        res.map((item) => {
          item.data.results.forEach((arr) => {
            items.push(arr);
          });
        });
      }

      return items;
    } catch (error) {
      console.log(error);
    }
  }

  const fetchedIitems = await loadPurchases();

  return fetchedIitems;
}

export default GetItems;
