import { gql, useQuery } from "@apollo/client";

export const GET_AUTHORS = gql`
  query getAllAuthors {
    getAllAuthors {
      _id
      firstName
      lastName
      email
    }
  }
`;
export const useGetAllAuthors = () => {
  const { data, error } = useQuery(GET_AUTHORS);
  if (error && process.env.NODE_ENV === 'development') {
    console.log(error);
  }

  return data
};
