import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../src/assets/fonts/Montserrat-Regular.ttf";
import "../src/assets/fonts/Montserrat-Bold.ttf";
import "../src/assets/fonts/Montserrat-Light.ttf";

require('react-web-vector-icons/fonts');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
