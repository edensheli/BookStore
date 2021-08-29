import { gql, useQuery } from "@apollo/client";

export const GET_BOOKS_BY_AUTHOR = gql`
  query getBooksByAuthor($authorId: String!) {
    getBooksByAuthor(authorId: $authorId) {
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
export const useGetBooksByAuthor = (authorId: string | null) => {
  const { data, error, refetch } = useQuery(GET_BOOKS_BY_AUTHOR, { variables: { authorId } });
  if (error && process.env.NODE_ENV === 'development') {
    console.log(error);
  }
  const booksByAuthor = data
  const loadBooksByAuthor = refetch
  return { booksByAuthor, loadBooksByAuthor }
};
