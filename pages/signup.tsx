import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

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
import ROUTES from "../constants/routes.js";

const Signup = (): JSX.Element => {
  const emailEl = useRef("");
  const passwordEl = useRef("");
  const router = useRouter();
  const onSubmitHandler = event => {
    event.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: ` mutation {
    register(UserInput:{email:"${email}", password:"${password}"}){
    _id
    email
  }
  
}
`
    };

    axios.post(URL, requestBody, HEADERS).then(resData => {
      console.log(resData);
      router.push(
        ROUTES.profile.profile.replace(
          "[id]",
          `user/${resData.data.data.register._id}`
        )
      );
    });
  };

  return (
    <Wrapper>
      <WrapperInside>
        <Title>Sign up on Gmeal 👋 </Title>
        <Subtitle>Enter your email and password to sign up</Subtitle>
        <form onSubmit={onSubmitHandler}>
          <Input placeholder="Email" type="email" forwardedRef={emailEl} />
          <Input
            placeholder="Password"
            type="password"
            forwardedRef={passwordEl}
          />
          <Submit>Sign Up</Submit>
        </form>
        <Subtitle>Already have an account?</Subtitle>
        <Link href={ROUTES.auth.login}>
          <Highlighted>Log in</Highlighted>
        </Link>
      </WrapperInside>
    </Wrapper>
  );
};

export default Signup;
