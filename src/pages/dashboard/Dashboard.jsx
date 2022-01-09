import React, {useContext} from 'react';
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import AuthContext from '../../contexts/auth';
import "./dashboard.css";
export default function Dashboard() {
  const context = useContext(AuthContext);

  return (
    <div className="dashboard">
      <FeaturedInfo />
      <Chart />
    </div>
  );
}
