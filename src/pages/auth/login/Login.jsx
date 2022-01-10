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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  const context = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.location.replace("https://farma-usp.herokuapp.com/dashboard");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    const response = await context.Login(user);

    setTimeout(() => {
      if (response) {
        context.user = user;
      } else {
        setEmail("");
        setPassword("");
        localStorage.clear();
        setErrors(true);
        toast.error("Não foi possível fazer login, verifique seus dados");
      }
    }, 2000);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  function handleOnSubmit(e) {
    setLoading(true);

    setTimeout(() => {
      onSubmit(e);
    }, 4000);
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
              width={100}
              height={100}
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
            {/* {errors === true && (
              <h2>Erro no login, verifique seu email/senha</h2>
            )} */}

            <form onSubmit={handleOnSubmit}>
              <FormContainer>
                <FormLabel htmlFor="email">EMAIL</FormLabel>
                <br />
                <FormInput
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
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
