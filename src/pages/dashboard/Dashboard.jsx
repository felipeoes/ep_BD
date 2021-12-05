import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./dashboard.css";
export default function Dashboard() {
    return (
        <div className="dashboard">
            <FeaturedInfo/>
            <Chart/>
        </div>
    )
}
