import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Catergory } from "../common/interfaces/Category";

function Check() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        firstName
      }
    }
  `;
  const ADD_CATEGORY = gql`
    mutation addCategory($name: String!) {
      addCategory(name: $name) {
        name
      }
    }
  `;
  const [createUser] = useMutation(LOGIN);
  const [createCategory, { error }] = useMutation(ADD_CATEGORY);
  if (error) {
    console.log(error);
  }
  return (
    <div>
      <h1>Hey</h1>
      <input placeholder="username" onChange={(e) => setUser(e.target.value)} />
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => createUser({ variables: { email: user, password } })}
      />

      <button onClick={() => createCategory({ variables: { name: password } })}>
        Add
      </button>
    </div>
  );
}

export default Check;
