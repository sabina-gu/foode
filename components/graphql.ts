import { gql } from "@apollo/react-hooks";

export const LOGIN = gql`
  mutation RootMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export const SIGNUP = gql`
  mutation RootMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      _id
      email
    }
  }
`;
