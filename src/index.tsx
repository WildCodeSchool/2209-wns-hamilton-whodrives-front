import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LocationField from "./components/createTrip/LocationFields";
import ConfirmPrice from "./components/createTrip/ConfirmPrice";
import ReturnTrip from "./components/createTrip/ReturnTrip";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql/",
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
