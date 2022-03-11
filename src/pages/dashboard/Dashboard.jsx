import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { DashboardContainer } from "./styles";

import ListCompras from "./list/index.js";
import ListTop5Products from "../../components/pieChart/getTop5Products/getTop5Products";
import ListTop5Suppliers from "../../components/pieChart/getTop5Suppliers/getTop5Suppliers";

import Loading from "../../components/loading/Loading";
import ListTop5Employees from "./../../components/pieChart/getTop5Employees/getTop5Employees";

export default function Dashboard() {
  const data = ListCompras();

  const top5products = ListTop5Products(data);
  const top5Suppliers = ListTop5Suppliers(data);
  const top5Employees = ListTop5Employees(data);

  console.log("TOP 5 FUNCIONARIOS AQUI", top5Employees);

  return data.length && top5Employees.length ? (
    <DashboardContainer>
      <FeaturedInfo
        data={top5products}
        suppliers={top5Suppliers}
        employees={top5Employees}
      />
      <Chart compras={data} />
    </DashboardContainer>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <Loading width={70} height={70} />
    </div>
  );
}
