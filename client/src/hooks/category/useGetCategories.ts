import { gql, useQuery } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      _id
      name
    }
  }
`;
export const useGetCategories = () => {
  const { data, error } = useQuery(GET_CATEGORIES);
  if (error && process.env.NODE_ENV === 'development') {
    console.log(error);
  }
  return data
};
