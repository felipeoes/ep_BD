import React, { useEffect } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./dashboard.css";

import ListCompras from "./list/index.js";
import ListTop5Products from "../../components/pieChart/getTop5Products/getTop5Products";
import ListTop5Suppliers from "../../components/pieChart/getTop5Suppliers/getTop5Suppliers";

import Loading from "../../components/loading/Loading";
import AutoScrollContainer from "auto-scroll-container";

export default function Dashboard() {
  const data = ListCompras();

  const top5products = ListTop5Products(data);
  const top5Suppliers = ListTop5Suppliers(data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="dashboard">
      {data.length ? (
        <AutoScrollContainer className="my-scroll-style">
          <FeaturedInfo data={top5products} suppliers={top5Suppliers} />

          <Chart compras={data} />
        </AutoScrollContainer>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <Loading />
        </div>
      )}
    </div>
  );
}
