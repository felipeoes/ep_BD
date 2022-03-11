import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  background: #f0f0f0;
  width: 100%;
  justify-content: center;
 
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 256px;
  width: 258px;
  

  background: #ffffff;
  box-shadow: 0px 7px 20px rgba(40, 41, 61, 0.08);
  border-radius: 8px;
  margin: 20px;
`;

export const UserInfoContainer = styled.div`
  height: 500px;
  width: 739px;
  background: #ffffff;

  box-shadow: 0px 7px 20px rgba(40, 41, 61, 0.08);
  border-radius: 8px;
  overflow: auto;
  margin: 20px;
`;

export const MenuTitle = styled.h1`
  font-family: MontserratRegular;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;

  color: #3a3c40;
  margin-left: 2rem;
`;

export const MenuItemsContainer = styled.ul`
  height: 100%;
  list-style: none;
  padding: 0;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  width: 90%;
  height: 36px;
  font-family: MontserratRegular;
  cursor: pointer;

  font-size: 14px;
  color: #3a3c40;
  vertical-align: middle;

  .active,
  :hover {
    background-color: #f5f5f7;
    color: #2940d3;
  }

  a {
    text-decoration-line: none;
  }
`;
