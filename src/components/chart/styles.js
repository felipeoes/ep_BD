import styled from "styled-components";

export const ChartContainer = styled.div`
  width: 100%;
  height: 420px;

  @media only screen and (min-width: 975px) and (max-height: 768px) {
    height: 340px;
  } ;
`;

export const ChartWrapper = styled.div`
  height: 100%;
  margin: 20px;

  padding: 20px 20px 0;
  border: 1px #dfe0eb solid;
  border-radius: 10px;
  /* -webkit-box-shadow: 6px 4px 14px 0px rgba(0, 0, 0, 0.32);
  box-shadow: 6px 4px 14px 0px rgba(0, 0, 0, 0.32); */
  background-color: white;

  :hover {
    border-color: #3751ff;
    color: #3751ff;
    -webkit-box-shadow: 1px 0px 1px 0px rgba(0, 0, 0, 0.32);
    box-shadow: 1px 0px 1px 0px rgba(0, 0, 0, 0.32);
  }
`;
