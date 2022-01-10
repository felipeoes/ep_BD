import "./featuredInfo.css";
import { MonitorHeart, Email, People } from "@mui/icons-material/";
import MyPieChart from "../pieChart/pieChart";
import { FeaturedCardSubtitle, FeaturedCardTitle } from "./styles";
import ListTop5Products from "../pieChart/getTop5Products/getTop5Products";
import Loading from "../loading/Loading";
export default function FeaturedInfo(props) {
  //   const data = ListTop5Products(props.data);


  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredInfo">
          <FeaturedCardTitle>Top 5 produtos</FeaturedCardTitle>
          <FeaturedCardSubtitle>Contagem semanal</FeaturedCardSubtitle>
          <MyPieChart data={props.data} />
        </div>
      </div>

      <div className="featuredItem">
        <div className="featuredInfo">
          <FeaturedCardTitle>Top 5 fornecedores</FeaturedCardTitle>
          <FeaturedCardSubtitle>Contagem semanal</FeaturedCardSubtitle>
          <MyPieChart data={props.suppliers} marginLeft={35} />
        </div>
      </div>

      {/* <div className="featuredItem">
        <div className="featuredInfo">
          <Email className="featuredIconContainer" />
          <div className="message">
            <span className="featuredTitle">Titulo</span>
            <div className="featuredMessageContainer">
              <span className="featuredMessage">Mensagem</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="featuredItem">
        <div className="featuredInfo">
          <FeaturedCardTitle>Top 5 produtos</FeaturedCardTitle>
          <FeaturedCardSubtitle>Contagem semanal</FeaturedCardSubtitle>
          <MyPieChart data={props.data} />
        </div>
      </div> */}

      {/* <div className="featuredItem">
        <div className="featuredInfo">
          <People className="featuredIconContainer" />
          <div className="message">
            <span className="featuredTitle">Titulo</span>
            <div className="featuredMessageContainer">
              <span className="featuredMessage">Mensagem</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
