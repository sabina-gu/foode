import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";

import { Navbar } from "../../components/auth/Navbar";
import Welcome from "../../public/assets/images/Welcome.svg?sprite";

const PageLogged = (): JSX.Element => {
  const { width, height } = useWindowSize();
  return (
    <>
      <Navbar />
      <Wrapper>
        <Welcome />
        <Confetti width={width} height={height} />
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
