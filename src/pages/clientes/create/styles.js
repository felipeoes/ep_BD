import styled from "styled-components";

export const CreateProductContainer = styled.div`
  display: flex;
  margin-top: 0;
  padding: 0;
  width: 100%;
  height: 90%;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const EmployeeTypeSelect = styled.select`
  height: 35px;
  width: 206px;
  border-radius: 8px;
  padding: 2px 8px 2px 9px;
  margin-left: 1rem;
  margin-top: -5px;
  border: 2px solid #e3e6eb;
  font-family: MontserratRegular;
  font-size: 13px;
`;

export const Container = styled.form`
  margin: auto;
  width: 60%;
  height: 100%;

  h2 {
    /* color: var(--text-title); */
    font-size: 1.5rem;
    text-align: center;
  }

  input,
  select {
    width: 100%;
    padding: 0 0.25rem;
    height: 2.2rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: #e7e9ee;

    font-weight: 400;
    font-size: 1rem;
    margin-top: 1rem;

    &::placeholder {
      color: var(--text-body);
    }
  }

  select {
    color: var(--text-body);
  }

  input[type="radio"] {
    height: 1rem;
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 2.5rem;
    background: #2c3e4e;
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const CreateProductFormLabel = styled.label`
  font-family: MontserratRegular;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 1rem;

  padding: 10px, 10px, 10px, 15px;
`;

export const CreateProductFormInput = styled.input`
  height: 26px;
  width: 206px;
  border-radius: 8px;
  padding: 2px 8px 2px 9px;
  margin-left: 1rem;
  margin-top: -5px;
  border: 2px solid #e3e6eb;
`;

export const CreateProductButtonsContainer = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
  height: 38px;
  width: 100%;
  align-self: right;

  padding-top: 50px;
  margin-top: 0;
`;

export const SaveButton = styled.button`
  background: #2940d3;
  height: 38px;
  width: 136px;
  font-family: MontserratRegular;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;

  -webkit-border-radius: 8px;
  border-radius: 4px;
  border: 0 none;
`;

export const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  width: 136px;
  color: #82868c;
  cursor: pointer;
  font-family: MontserratRegular;
  background: #ffffff;
  border: 1px solid #e3e6eb;
  box-sizing: border-box;
  border-radius: 4px;
  margin-right: 12px;
`;

export const GenderContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-around;
`;

export const GenderContainerType = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;

  input[type="radio"] {
    height: 1rem;
    width: 1rem;
  }
`;
