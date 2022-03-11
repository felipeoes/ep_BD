import styled from "styled-components";
import { Link } from "react-router-dom";

export const UserIcon = styled.img`
  border-radius: 50%;
  width: 42px;
  height: 42px;
`;

export const TopbarUL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TopbarLI = styled.li`
  border-bottom: 1px solid #dddddd;
`;

export const TopbarLink = styled(Link)`
  font-family: MontserratLight;
  font-size: 14px;
  text-decoration: none;
  color: #333333;
  padding: 15px 20px;
  display: block;
  border-radius: 3px;

  &:hover {
    background-color: rgba(159, 162, 180, 0.08);
  }
`;
