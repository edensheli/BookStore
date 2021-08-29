import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation addBook($book: BookInput!) {
    addBook(book: $book) {
      _id
    }
  }
`;