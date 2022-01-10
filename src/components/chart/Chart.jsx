import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Chart(props) {
  const array = props.compras;
  const today = new Date();
  const dateNow =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  const hours =
    today.getHours() +
    ":" +
    (today.getMinutes() < 10 ? "0" : "") +
    today.getMinutes();

  return (
    <div className="chart">
      <h3 className="chartTitle">Valor de compras por mês</h3>
      <p className="chartSubtitle">
        atualizado em {dateNow}, {hours}
      </p>
      <ResponsiveContainer
        width="100%"
        aspect={4 / 1}
        style={{ borderRadius: 5 }}
      >
        <LineChart
          width={500}
          height={300}
          data={array}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="acumulado"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="presente" stroke="#82ca9d" />
          <Line type="monotone" dataKey="media" stroke="#ee82ee" name="média" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
