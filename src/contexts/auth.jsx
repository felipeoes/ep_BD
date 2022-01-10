import React, { createContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext({});

const userObj = {
  email: "",
  password: "",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userObj);

  async function Login(userData) {
    const data = JSON.stringify(userData);

    fetch("https://frontbd.vercel.app/api/v1/usuarios/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          window.location.replace("https://frontbd.vercel.app/dashboard");
          return true;
        } else {
          setUser(null);
          localStorage.clear();
        }
      });

    return false;
  }

  async function Register(userData) {
    const data = JSON.stringify(userData);

    fetch("https://frontbd.vercel.app/api/v1/usuarios/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          window.location.replace("https://frontbd.vercel.app/dashboard");
        } else {
          setUser(null);
          localStorage.clear();
        }
        return data;
      });
  }

  async function Logout() {
    if (localStorage.getItem("token") !== null) {
      fetch("https://frontbd.vercel.app/api/v1/usuarios/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.clear();
          window.location.replace("https://frontbd.vercel.app/login");
        });
    }
  }

  return (
    // <AuthContext.Provider value={{ signed: Boolean(user), user, Login }}>
    <AuthContext.Provider
      value={{
        signed: Boolean(localStorage.getItem("token") !== null),
        user,
        Login,
        Register,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
