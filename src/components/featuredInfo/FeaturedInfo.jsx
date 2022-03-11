import "./featuredInfo.css";
import MyPieChart from "../pieChart/pieChart";
import { FeaturedCardSubtitle, FeaturedCardTitle } from "./styles";
export default function FeaturedInfo(props) {
  return (
    <div className="featured">
      <div className="featuredItem" style={{ marginTop: 0 }}>
        <div className="featuredInfo">
          <FeaturedCardTitle>Top 5 produtos</FeaturedCardTitle>
          <FeaturedCardSubtitle>Contagem semanal </FeaturedCardSubtitle>
          <FeaturedCardSubtitle>Quantidade total vendida do produto</FeaturedCardSubtitle>
          <MyPieChart data={props.data} />
        </div>
      </div>

      <div className="featuredItem">
        <div className="featuredInfo">
          <FeaturedCardTitle>Top 5 fornecedores</FeaturedCardTitle>
          <FeaturedCardSubtitle>Contagem semanal</FeaturedCardSubtitle>
          <FeaturedCardSubtitle>Valor total das solicitações de produtos (R$)</FeaturedCardSubtitle>
          <MyPieChart data={props.suppliers} suppliers={true} marginLeft={35} />
        </div>
      </div>

      <div className="featuredItem">
        <div className="featuredInfo">
          <FeaturedCardTitle>Top 5 funcionários</FeaturedCardTitle>
          <FeaturedCardSubtitle>Contagem semanal</FeaturedCardSubtitle>
          <FeaturedCardSubtitle>Valor total dos produtos vendidos (R$)</FeaturedCardSubtitle>
          <MyPieChart data={props.employees} suppliers={true} />
        </div>
      </div>
    </div>
  );
}
