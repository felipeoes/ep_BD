import React, { useContext } from 'react';
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import AuthContext from '../../contexts/auth';
import "./dashboard.css";

import ListCompras from './list/index.js';
import Loading from '../../components/loading/Loading';

export default function Dashboard() {
    const context = useContext(AuthContext);

    const data = ListCompras();

    return (
        <div className="dashboard">
            <FeaturedInfo />
            {data.length ?
                <Chart
                    compras={data}
                />
                :
                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10%'
                    }
                }>
                    <Loading />
                </div>
            }
        </div>
    );
}
