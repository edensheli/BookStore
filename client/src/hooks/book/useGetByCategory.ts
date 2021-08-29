import { gql, useQuery } from "@apollo/client";

export const GET_BOOKS_BY_CATEGORY = gql`
  query getBooksByCategory($categoryId: String!) {
    getBooksByCategory(categoryId: $categoryId) {
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
export const useGetBooksByCategory = (categoryId: string | null) => {
  const { data, error, refetch } = useQuery(GET_BOOKS_BY_CATEGORY, { variables: { categoryId } });
  if (error && process.env.NODE_ENV === 'development') {
    console.log(error);
  }
  const booksByCategory = data
  const loadBooksByCategory = refetch
  return { booksByCategory, loadBooksByCategory }
};
