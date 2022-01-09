/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import MyRoutes from "./routes";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
