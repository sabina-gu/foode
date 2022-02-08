import { useContext } from "react";
import styled from "styled-components";

import AuthContext from "../context/auth-context";

export const Navbar = () => {
  const ContextNav = useContext(AuthContext);
  return (
    <Wrapper>
      <UlList>
        <List>
          <LogoutButton onClick={ContextNav.logout}>Log out</LogoutButton>
        </List>
      </UlList>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: flex-end;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
`;

const List = styled.a`
  display: inline;
  margin-left: 20px;
  text-decoration: none;
`;

const UlList = styled.a`
  margin-right: 100px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  :hover {
    color: #00bc87;
  }
`;
