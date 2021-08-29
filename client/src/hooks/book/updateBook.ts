import { gql } from "@apollo/client";

export const UPDATE_BOOK = gql`
  mutation updateBook($book: BookInput!) {
    updateBook(book: $book) {
      _id
    }
  }
`;
