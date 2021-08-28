import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation addCategory($name: String!) {
    addCategory(name:$name) {
      _id
      name
    }
  }
`;
