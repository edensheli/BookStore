import { gql } from "@apollo/client";

export const DELETE_CATEGORY = gql`
  mutation removeCategory($id: String!) {
    removeCategory(id:$id) {
      _id
      name
    }
  }
`;
