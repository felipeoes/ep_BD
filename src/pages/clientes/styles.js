import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  
  overflow-y: scroll;
  align-items: center;

  h2 {
    font-family: MontserratLight;
    margin-top: 1.2765rem;
    margin-left: 1.8765rem;
    font-size: 1.3765rem;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  
`;

export const AutocompleteContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 1.875rem;
  margin-left: 3rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AddClientButton = styled.button`
  display: flex;
  flex-direction: row;
  background: #3751ff;
  width: 136px;
  height: 38px;
  font-family: MontserratRegular;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  -webkit-border-radius: 4px;
  border: 0 none;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 5px 18px rgba(40, 41, 61, 0.07);
  border-radius: 4px;
  margin-top: 2rem;
  margin-left: 1.575rem;
`;

export const ClientLabelsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 20px;
  width: 1078px;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 26px;
`;

export const SecondLabelsContainer = styled.div`
  display: flex;
  width: 520px;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 0px;
`;
export const ClientLabel = styled.label`
  font-family: MontserratRegular;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;

  color: #82868c;
  margin-left: 60px;
  padding-left: 10px;
`;

export const ClientCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 85px;
  width: 1121px;

  background: #ffffff;

  border: 1px solid #e3e6eb;
  box-sizing: border-box;

  box-shadow: 0px 7px 20px rgba(40, 41, 61, 0.08);
  border-radius: 8px;
  margin-bottom: 24px;
`;

export const ClientMainInfoContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  align-content: left;
  width: 285px;
  height: 75px;
  margin-left: 0px;
`;

export const ClientName = styled.p`
  font-family: MontserratRegular;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  margin-left: 20px;
  color: #3a3c40;
`;

export const CardContainer = styled.div`
  display: flex;
  width: 90%;
  height: 70%;

  align-items: center;
  justify-content: space-evenly;
`;

export const ClientCommonInfo = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #82868c;
`;

export const ClientEditContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
  -webkit-border-radius: 8px;
  border: 0 none;
  background: #ffffff;
  border: 1px solid #babfc5;
  box-sizing: border-box;
  border-radius: 8px;
  margin-right: 20px;
`;

export const ClientEditIcon = styled.img`
  height: 26.5px;
  width: 26.5px;
  color: #82868c;
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

  svg {
    text-align: center;
    height: 35%;
    width: 50%;
  }

  a {
    font-size: 1.5em;
  }
`;

export const CardTitle = styled.h4`
  padding: 2px 16px;
  color: black;
`;
