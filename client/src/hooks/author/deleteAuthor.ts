import { gql } from "@apollo/client";

export const DELETE_AUTHOR = gql`
  mutation removeAuthor($email: String!) {
    removeAuthor(email:$email) {
      _id
      email
    }
  }
`;
