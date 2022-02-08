import { FormikErrors } from "formik";

export type LoginForm = {
  email: string;
  password: string;
};

export type LoginFormErrors = FormikErrors<LoginForm>;
