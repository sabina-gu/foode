/*import Fonts from "../Fonts";*/
import "./app.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useRouter } from "next/router";
import { NextQueryParamProvider } from "next-query-params";
import { useState } from "react";

import AuthContext from "../components/context/auth-context";
import ROUTES from "../constants/routes";
import Fonts from "../Fonts.js";

function App({ Component, pageProps }) {
  const router = useRouter();
  const [token, setToken] = useState("null");
  const [userId, setUserId] = useState("null");

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };
  const logout = (token, userId, tokenExpiration) => {
    setToken(null);
    setUserId(null);
    router.push(ROUTES.profile.profile.replace("[id]", "login"));
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
