import { useMutation } from "@apollo/react-hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
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
import { SIGNUP } from "../components/graphql";
import ROUTES from "../constants/routes.js";

const schema = object().shape({
  email: string().email("Enter email").required("No email provided."),
  password: string()
    .required("No password provided.")
    .min(5, "Password is too short - should be 5 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
});

const ErrorEmailMessage = "User exists already";

const Signup = (): JSX.Element => {
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

  const [signup] = useMutation(SIGNUP);

  const onSubmitHandler = async ({
    email,
    password
  }: RegistrationFormFields) => {
    try {
      const result = await signup({
        variables: { email: email, password: password }
      });

      console.log(result);

      if (email.trim().length === 0 || password.trim().length === 0) {
        return;
      }

      router.push(
        ROUTES.profile.profile.replace("[id]", `user/${result.data.signup._id}`)
      );
    } catch (error: any) {
      console.log(error);
      const errors = error.graphQLErrors[0].message;
      if (errors === ErrorEmailMessage) {
        setError("email", {
          type: "server",
          message: ErrorEmailMessage
        });
      } else {
        throw error;
      }
    }
  };

  return (
    <Wrapper>
      <WrapperInside>
        <Title>Sign up on Gmeal 👋 </Title>
        <Subtitle>Enter your email and password to sign up</Subtitle>
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
          <SubmitButton>Sign up</SubmitButton>
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
