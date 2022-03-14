import "./app.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { NextQueryParamProvider } from "next-query-params";
import { useState } from "react";

import AuthContext from "../components/context/auth-context";
import ROUTES from "../constants/routes";
import Fonts from "../Fonts.js";

type LoginProps = {
  token: string | null;
  userId: string | null;
  tokenExpiration?: number | null;
};

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const logout = (): void => {
    setToken(null);
    setUserId(null);
    router.push(ROUTES.profile.profile.replace("[id]", "login"));
  };

  const login = ({ token, userId }: LoginProps): void => {
    setToken(token);
    setUserId(userId);
  };
  const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache()
  });
  return (
    <NextQueryParamProvider>
      <Fonts />
      <AuthContext.Provider
        value={{ token: null, userId: null, login, logout }}
      >
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthContext.Provider>
    </NextQueryParamProvider>
  );
}

export default App;
