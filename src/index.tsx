import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { formDataAppendFile } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql/",
  headers: { "Apollo-Require-Preflight": "true" },
  formDataAppendFile,
});

const client = new ApolloClient({
  link: ApolloLink.from([uploadLink]), //le tableau vous permettra d'injecter d'autres link comme pour l'authentification
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
