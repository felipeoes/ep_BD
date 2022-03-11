import "./pieChart.css";
import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { toast } from "react-toastify";

let isSuppliersChart = false;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    suppliers,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        style={{
          zIndex: 1000,
          fontFamily: "MontserratRegular",
          fontSize: "13px",
        }}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        style={{
          zIndex: 1000,
          fontFamily: "MontserratRegular",
          fontSize: "13px",
        }}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {isSuppliersChart ? `R$${value}` : `${value}`}
      </text>
      <text
        style={{
          zIndex: 1000,
          fontFamily: "MontserratLight",
          fontSize: "12px",
        }}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export default function MyPieChart(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  isSuppliersChart = props.suppliers ? true : false;

  return (
    <PieChart width={400} height={400} suppliers={props.suppliers}>
      {props.marginLeft ? (
        <Pie
          style={{ zIndex: 100 }}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={props.data}
          suppliers={props.suppliers}
          cx={170}
          cy={120}
          innerRadius={60}
          outerRadius={70}
          fill="#2940D3"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      ) : (
        <Pie
          style={{ zIndex: 100 }}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={props.data}
          suppliers={props.suppliers}
          cx={155}
          cy={120}
          innerRadius={60}
          outerRadius={70}
          fill="#2940D3"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      )}
    </PieChart>
  );
}
