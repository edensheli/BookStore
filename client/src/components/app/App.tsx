import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../../common/apollo-client";
import Routes from "./Routes";

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
