import styled from "styled-components";

import Navbar from "../../components/auth/navbar";
import Welcome from "../../public/assets/images/Welcome.svg?sprite";

const PageLogged = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <Welcome />
      </Wrapper>
    </>
  );
};
export default PageLogged;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  padding-top: 100px;
`;
