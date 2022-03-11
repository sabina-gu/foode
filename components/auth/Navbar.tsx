import Button from "@material-ui/core/Button";
import { useContext } from "react";
import styled from "styled-components";

import AuthContext from "../context/auth-context";

export const Navbar = () => {
  const ContextNav = useContext(AuthContext);
  return (
    <Wrapper>
      <UlList>
        <List>
          <Button
            style={{
              backgroundColor: "#07ad7e",
              padding: "5px",
              fontSize: "11px",
              color: "white"
            }}
            onClick={ContextNav.logout}
          >
            Log out
          </Button>
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
