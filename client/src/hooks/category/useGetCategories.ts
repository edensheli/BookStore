import { gql, useQuery } from "@apollo/client";
import { Catergory } from "../../common/interfaces/Category";

const GET_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      name
    }
  }
`;
export const useGetCategories = (): Catergory[] | undefined => {
  const { data } = useQuery(GET_CATEGORIES);
  return data.getAllCategories;
};
