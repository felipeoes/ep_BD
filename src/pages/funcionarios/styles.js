import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;

  align-items: center;

  h2{
    margin-top: 3rem;
    font-size: 2rem;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  width: 90%;
  height: 70%;

  align-items: center;
  justify-content: space-evenly;
`;

export const Card = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  height: 55%;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  svg{
    text-align: center;
    height: 35%;
    width: 50%;
  }

  a{
    font-size: 1.5em;
  }
`;

export const CardTitle = styled.h4`
  padding: 2px 16px;
  color: black;
`;
