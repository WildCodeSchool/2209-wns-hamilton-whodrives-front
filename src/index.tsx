import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { formDataAppendFile } from "apollo-upload-client";
import { AuthProvider } from "./context/AuthContext";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql/",
});

const authLink = setContext((_: any, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql/",
  headers: { "Apollo-Require-Preflight": "true" },
  formDataAppendFile,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink).concat(uploadLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
