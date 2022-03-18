import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

import { RegistrationFormFields } from "../components/auth/declarations";
import { Input } from "../components/auth/Input";
import {
  Highlighted,
  Subtitle,
  Title,
  Wrapper,
  WrapperInside
} from "../components/auth/styled";
import SubmitButton from "../components/auth/SubmitButton";
import AuthContext from "../components/context/auth-context";
import { LOGIN } from "../components/graphql";
import ROUTES from "../constants/routes";

const ErrorEmailMessage = "User  doesn't exists";
const ErrorPasswordMessage = "Password is incorrect";

const schema = object().shape({
  email: string().email("Invalid email").required("No email provided."),
  password: string()
    .required("No password provided.")
    .min(5, "Password is too short - should be 5 chars minimum.")
    .max(32)
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
});
const Login: FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegistrationFormFields>({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

  const ContextLogin = useContext(AuthContext);

  const [login] = useMutation(LOGIN);

  const onSubmitHandler = async ({
    email,
    password
  }: RegistrationFormFields) => {
    try {
      const result = await login({
        variables: { email: email, password: password }
      });
      if (email.trim().length === 0 || password.trim().length === 0) {
        return;
      }

      const res = result.data.login;

      if (res.token) {
        ContextLogin.login(res.token, res.userId, res.tokenExpiration);
        router.push(
          ROUTES.profile.profile.replace("[id]", `user/${res.userId}`)
        );
      }
    } catch (error) {
      const errors = error.graphQLErrors[0].message;
      if (errors === ErrorEmailMessage) {
        setError("email", {
          type: "server",
          message: ErrorEmailMessage
        });
      }

      if (errors === ErrorPasswordMessage) {
        setError("password", {
          type: "server",
          message: ErrorPasswordMessage
        });
      }
    }
  };

  return (
    <Wrapper>
      <WrapperInside>
        <Title>Log in to Gmeal ☺️</Title>
        <Subtitle>Enter your email and password to log in</Subtitle>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Input
            type="text"
            label="Email"
            placeholder="Email"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <Input
            type="text"
            label="Password"
            placeholder="password"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
          <SubmitButton>Log In</SubmitButton>
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
