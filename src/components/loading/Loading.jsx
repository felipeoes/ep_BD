import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color, active = true, height, width }) =>
    active ? (
        <ReactLoading type={type || 'spin'} color={color || '#2940D3'} height={height || '50px'} width={width || '50px'} />
    ) : (
        ""
    );


export default Loading;
