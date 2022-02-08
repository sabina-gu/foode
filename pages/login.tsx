import { onError } from "@apollo/client/link/error";
import { useQuery } from "@apollo/react-hooks";
import axios from "axios";
import { GraphQLError } from "graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import styled from "styled-components";

import { HEADERS, URL } from "../components/auth/constants";
import Input from "../components/auth/Input";
import {
  Highlighted,
  Submit,
  Subtitle,
  Title,
  Wrapper,
  WrapperInside
} from "../components/auth/styled";
import AuthContext from "../components/context/auth-context";
import { LOGIN } from "../components/graphql";
import ROUTES from "../constants/routes";

const Login = () => {
  const emailEl = useRef("");
  const passwordEl = useRef("");
  const router = useRouter();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const ContextLogin = useContext(AuthContext);
  const ErrorEmailMessage = "User doesn't exist";
  const ErrorPasswordMessage = "Password is incorrect";

  const { data } = useQuery(LOGIN);

  const onSubmitHandler = event => {
    event.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    axios
      .post(URL, login, HEADERS)

      .then(resData => {
        console.log(resData);

        if (resData.data.data.login.token) {
          setEmailError(false);
          setPasswordError(false);
          ContextLogin.login(
            resData.data.data.login.token,
            resData.data.data.login.userId,
            resData.data.data.login.tokenExpiration
          );
          router.push(
            ROUTES.profile.profile.replace(
              "[id]",
              `user/${resData.data.data.login.userId}`
            )
          );
        }
      });
  };
  return (
    <Wrapper>
      <WrapperInside>
        <Title>Log in to Gmeal ☺️</Title>
        <Subtitle>Enter your email and password to log in</Subtitle>
        <form onSubmit={onSubmitHandler}>
          {emailError && <ErrorMessage>The email does not exist</ErrorMessage>}
          <Input placeholder="Email" type="email" forwardedRef={emailEl} />
          {passwordError && <ErrorMessage>Incorrect password</ErrorMessage>}
          <Input
            placeholder="Password"
            type="password"
            forwardedRef={passwordEl}
          />
          <Submit>Log In</Submit>
        </form>
        <Subtitle>No account?</Subtitle>{" "}
        <Link href={ROUTES.auth.signup}>
          <Highlighted> Create one </Highlighted>
        </Link>
      </WrapperInside>
    </Wrapper>
  );
};

export default Login;

const ErrorMessage = styled.span`
  color: red;
  font-size: 11px;
  margin-top: 0;
`;
