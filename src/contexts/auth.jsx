import React, { useEffect, createContext, useState } from "react";
import { FRONT_BASEURL, apiAuth } from "../services/api";

const AuthContext = createContext({});

const userObj = {
  email: "",
  password: "",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userObj);

  async function Login(userData) {
    const data = userData;

    let errors = { name: "", message: "" };

    const response = await apiAuth
      .post(`/login/`, data)
      .then((res) => {
        if (res.data.key) {
          localStorage.clear();
          localStorage.setItem("token", res.data.key);
          return res;
        }
      })
      .catch((error) => {
        console.log(error.response);
        errors = error.response.data;
        console.log(errors);

        setUser(null);
        localStorage.clear();
        return errors;
      });

    return response;
  }

  async function Register(userData) {
    const data = userData;
    const response = await apiAuth.post(`/register/`, data);

    if (response.data.key) {
      localStorage.clear();
      localStorage.setItem("token", response.data.key);
      window.location.replace(`${FRONT_BASEURL}/dashboard`);
    } else {
      setUser(null);
      localStorage.clear();
    }
  }

  async function Logout() {
    const data = { key: localStorage.getItem("token") };
    const response = await apiAuth.post(`/logout/`, data);

    if (response.status === 200) {
      localStorage.clear();
      setUser(null);
    }

    window.location.replace(`${FRONT_BASEURL}/login`);
  }

  async function GetUser() {
    // função chamada apenas uma vez para setar o user no contexto global da aplicação
    if (localStorage.getItem("token") === null) {
      window.location.replace(`${FRONT_BASEURL}/login`);
    } else {
      apiAuth.defaults.headers.Authorization = `Token ${localStorage.getItem(
        "token"
      )}`;
      const response = await apiAuth.get(`/user/`);
      const user = response.data;

      console.log("entrei na funcao getUser");

      console.log(user);
      // setUser(user);

      apiAuth.defaults.headers.Authorization = null;
      return user;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(localStorage.getItem("token") !== null),
        user,
        Login,
        Register,
        Logout,
        GetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
