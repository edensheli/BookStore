import { gql, useQuery } from "@apollo/client";

export const GET_BOOKS = gql`
  query getAllBooks {
    getAllBooks {
      _id
      title
      price
      author{
        _id
        firstName
        lastName
        email
      }
      category{
        _id
        name
      }
    }
  }
`;
export const useGetAllBooks = () => {
  const { data, error } = useQuery(GET_BOOKS);
  if (error && process.env.NODE_ENV === 'development') {
    console.log(error);
  }
  return data
};
