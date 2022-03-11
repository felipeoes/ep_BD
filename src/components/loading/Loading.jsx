import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color, active = true, height, width }) =>
  active ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <ReactLoading
        type={type || "spin"}
        color={color || "#2940D3"}
        height={height || "50px"}
        width={width || "50px"}
      />
    </div>
  ) : (
    ""
  );

export default Loading;
