import { gql } from "@apollo/client";

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($data: AuthorInput!) {
    updateAuthor(data: $data) {
      _id
      email
    }
  }
`;
