import { gql } from "@apollo/react-hooks";

export const LOGIN = gql`
  query RootQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;
