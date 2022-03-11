import React, { useState, useEffect, useContext } from "react";
import {
  MainContainer,
  LoginContainer,
  LoginIconContainer,
  LoginLogoTitle,
  LoginTitle,
  LoginIcon,
  LoginContentContainer,
  LoginSubTitle,
  FormLabel,
  FormContainer,
  FormInput,
  LoginButton,
  LoginSignUpLink,
  LoginFooterContainer,
} from "./styles.js";
import logo from "../../../assets/images/logoUSP.svg";
import "./Login.css";
import AuthContext from "../../../contexts/auth";
import Loading from "../../../components/loading/Loading.jsx";
import { toast } from "react-toastify";
import { FRONT_BASEURL } from "../../../services/api.js";

export default function Login({ updateUser }) {
  const [functional, setFunctional] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.location.replace(`${FRONT_BASEURL}/dashboard`);
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      funcional: functional,
      password: password,
    };

    const response = await context.Login(user);

    setTimeout(() => {
      console.log(response);
      if (response && response.status === 200) {
        window.location.replace(`${FRONT_BASEURL}/dashboard`);
      } else {
        setFunctional("");
        setPassword("");
        localStorage.clear();
        setErrors(true);
        toast.error(response);
        setErrorMessage(JSON.stringify(response));
      }
    }, 2000);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  function handleOnSubmit(e) {
    setLoading(true);

    onSubmit(e);
  }

  return (
    <MainContainer>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginContainer
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading
              type="spin"
              color="#2940D3"
              active={loading}
              width={70}
              height={70}
            />
          </LoginContainer>
        </div>
      ) : (
        <LoginContainer>
          <LoginIconContainer>
            <LoginIcon alt="logo" className="logoImg" src={logo} />
            <LoginLogoTitle>FarmaUSP</LoginLogoTitle>
          </LoginIconContainer>
          {loading === false && (
            <LoginContentContainer>
              <LoginTitle>Faça login na FarmaUSP</LoginTitle>
              <LoginSubTitle>Digite seus dados de login abaixo</LoginSubTitle>
            </LoginContentContainer>
          )}

          <div>
            {errors && (
              <p
                style={{
                  textAlign: "center",
                  color: "red",
                  fontFamily: "MontserratRegular",
                  fontSize: 14,
                  height: 15,
                }}
              >
                {errorMessage}
              </p>
            )}
            <form onSubmit={handleOnSubmit}>
              <FormContainer>
                <FormLabel htmlFor="email">FUNCIONAL</FormLabel>
                <br />
                <FormInput
                  name="functional"
                  type="text"
                  value={functional}
                  required
                  onChange={(e) => setFunctional(e.target.value)}
                />{" "}
                <br />
                <FormLabel htmlFor="password">SENHA</FormLabel>
                <br />
                <FormInput
                  name="password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
                <LoginButton type="submit" value="Entrar" />
              </FormContainer>
            </form>
          </div>

          <LoginFooterContainer>
            <LoginSubTitle>
              Não tem uma conta ainda?{" "}
              <LoginSignUpLink href="/signup" className="loginLink">
                Cadastrar
              </LoginSignUpLink>
            </LoginSubTitle>
          </LoginFooterContainer>
        </LoginContainer>
      )}
    </MainContainer>
  );
}
