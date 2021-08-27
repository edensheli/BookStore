import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../../common/apollo-client";
import Check from "../Check";

function App() {
  return (
    <ApolloProvider client={client}>
      <Check />
    </ApolloProvider>
  );
}

export default App;
