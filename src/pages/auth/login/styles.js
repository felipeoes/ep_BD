import styled from "styled-components";

import { Link } from "react-router-dom";
export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #363740;
  align-items: center;
  justify-content: center;
`;

export const LoginContainer = styled.div`
  display: block;
  width: 23.75rem;
  height: 36.375rem;
  border-radius: 8px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export const LoginIconContainer = styled.div`
  display: flex;
  height: 7.75rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const LoginIcon = styled.img`
  align-self: center;
  justify-self: center;
`;

export const LoginContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const LoginLogoTitle = styled.h1`
  font-family: MontserratLight;
  color: #a4a6b3;
  opacity: 0.7;
  letter-spacing: 0.4px;
  font-size: 19px;
  margin-top: 0.75rem;
`;

export const LoginTitle = styled.h1`
  font-family: MontserratRegular;
  color: #252733;
  letter-spacing: 0.4px;
  font-size: 19px;
  margin-top: 0.75rem;
`;

export const LoginSubTitle = styled.span`
  font-family: MontserratLight;
  color: #252733;
  letter-spacing: 0.4px;
  font-size: 12px;
  margin-top: 0.75rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 3rem;
`;

export const FormLabel = styled.label`
  color: #9fa2b4;
  font-family: MontserratBold;
  font-size: 12px;
  margin-left: 2rem;
`;

export const FormInput = styled.input`
  width: 19.75rem;
  height: 2.225rem;
  background: #fcfdfe;
  margin-top: -0.475rem;
  padding-left: 0.75rem;
  margin-left: 2rem;
  border: 1px solid #f0f1f7;
  box-sizing: border-box;
  border-radius: 8px;
`;

export const LoginButton = styled.input`
  background: #3751ff;
  height: 48px;
  width: 316px;
  margin-top: 1.5rem;
  font-family: MontserratRegular;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  align-self: center;
  box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
  -webkit-border-radius: 8px;
  border-radius: 8px;
  border: 0 none;
`;

export const LoginFooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2rem;
`;
export const LoginSignUpLink = styled.a`
  font-family: MontserratBold;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.2px;
  color: #3751ff;
`;
