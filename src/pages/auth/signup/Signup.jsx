import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../contexts/auth";
import logo from "../../../assets/images/logoUSP.svg";

import {
  FormContainer,
  FormInput,
  FormLabel,
  LoginButton,
  LoginContainer,
  LoginContentContainer,
  LoginFooterContainer,
  LoginIcon,
  LoginIconContainer,
  LoginLogoTitle,
  LoginSignUpLink,
  LoginSubTitle,
  LoginTitle,
  MainContainer,
} from "../login/styles";
import Loading from "../../../components/loading/Loading.jsx";
import { toast } from "react-toastify";
import { NameInputContainer } from "./styles";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [functional, setFunctional] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [finishedRegister, setFinishedRegister] = useState(false);

  const context = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.location.replace("http://localhost:3000/dashboard");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      first_name: firstName,
      last_name: lastName,
      funcional: functional,
      email: email,
      password1: password1,
      password2: password2,
    };

    const response = await context.Register(user);

    setTimeout(() => {
      if (response) {
        context.user = user;
      } else {
        setFirstName("");
        setLastName("");
        setFunctional("");
        setEmail("");
        setPassword1("");
        setPassword2("");
        localStorage.clear();
        setErrors(true);
        toast.error(
          "Não foi possível realizar o cadastro, verifique seus dados"
        );
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
          <LoginIconContainer style={{ marginTop: -30 }}>
            <LoginIcon alt="logo" className="logoImg" src={logo} />
            <LoginLogoTitle>FarmaUSP</LoginLogoTitle>
          </LoginIconContainer>
          {loading === false && (
            <LoginContentContainer style={{ marginTop: -15 }}>
              <LoginTitle>Crie sua conta na FarmaUSP</LoginTitle>
              <LoginSubTitle style={{ marginTop: 0, marginBottom: 5 }}>
                Digite seus dados de cadastro abaixo
              </LoginSubTitle>
            </LoginContentContainer>
          )}

          <div>
            {/* {errors === true && <h2>Erro no cadastro, verifique seus dados</h2>} */}

            <form onSubmit={handleOnSubmit}>
              <FormContainer style={{ marginTop: 0 }}>
                <NameInputContainer>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <FormLabel
                      style={{ marginTop: 5, marginBottom: -5 }}
                      htmlFor="firstName"
                    >
                      NOME
                    </FormLabel>
                    <br />
                    <FormInput
                      style={{ width: 140 }}
                      name="firstName"
                      type="text"
                      value={firstName}
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />{" "}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <FormLabel
                      style={{ marginTop: 5, marginBottom: -5 }}
                      htmlFor="lastName"
                    >
                      SOBRENOME
                    </FormLabel>
                    <br />
                    <FormInput
                      style={{ width: 140, marginRight: 40 }}
                      name="lastName"
                      type="text"
                      value={lastName}
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />{" "}
                  </div>
                </NameInputContainer>
                <FormLabel
                  style={{ marginTop: 5, marginBottom: -5 }}
                  htmlFor="functional"
                >
                  FUNCIONAL
                </FormLabel>
                <br />
                <FormInput
                  name="functional"
                  type="text"
                  value={functional}
                  required
                  onChange={(e) => setFunctional(e.target.value)}
                />{" "}
                <FormLabel
                  style={{ marginTop: 10, marginBottom: -5 }}
                  htmlFor="email"
                >
                  EMAIL
                </FormLabel>
                <br />
                <FormInput
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
                <br />
                <FormLabel
                  style={{ marginTop: -10, marginBottom: -5 }}
                  htmlFor="password"
                >
                  SENHA
                </FormLabel>
                <br />
                <FormInput
                  name="password"
                  type="password"
                  value={password1}
                  required
                  onChange={(e) => setPassword1(e.target.value)}
                />{" "}
                <FormLabel
                  style={{ marginTop: 10, marginBottom: -5 }}
                  htmlFor="password2"
                >
                  CONFIRMAR SENHA
                </FormLabel>
                <br />
                <FormInput
                  name="password2"
                  type="password"
                  value={password2}
                  required
                  onChange={(e) => setPassword2(e.target.value)}
                />{" "}
                <LoginButton
                  style={{
                    width: 200,
                    height: 40,
                    marginBottom: 0,
                    marginTop: 15,
                  }}
                  type="submit"
                  value="Cadastrar"
                />
              </FormContainer>
            </form>
          </div>

          <LoginFooterContainer style={{ marginTop: 0 }}>
            <LoginSubTitle>
              Já tem uma conta?{" "}
              <LoginSignUpLink href="/login" className="loginLink">
                Entrar
              </LoginSignUpLink>
            </LoginSubTitle>
          </LoginFooterContainer>
        </LoginContainer>
      )}
    </MainContainer>
  );
}
