import { gql, useQuery } from "@apollo/client";
import { User } from "../../common/interfaces/User";

const GET_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
    }
  }
`;
export const IsAuth = (): User | undefined => {
  const { data, error } = useQuery(GET_ME);
  if (error && process.env.NODE_ENV === 'development') {
    console.log(error);
  }

  return data?.me;
};
