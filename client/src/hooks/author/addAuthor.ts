import { gql } from "@apollo/client";

export const ADD_AUTHOR = gql`
  mutation addAuthor($data: AuthorInput!) {
    addAuthor(data: $data) {
      _id
      email
    }
  }
`;