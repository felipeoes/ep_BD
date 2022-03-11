import styled from "styled-components";

export const UpdateItemContainer = styled.div`
  display: flex;
  margin-top: 0;
  padding: 0;
  width: 100%;
  height: 90%;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const Container = styled.form`
  margin: auto;
  width: 60%;

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

  button[type="submit"],
  button[type="button"] {
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
  }
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
