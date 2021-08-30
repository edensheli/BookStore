import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($data: RegisterInput!) {
    register(data:$data) {
      _id
      firstName
      lastName
    }
  }
`;

