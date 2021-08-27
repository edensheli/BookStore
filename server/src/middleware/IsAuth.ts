import { MiddlewareFn } from "type-graphql"
import { verify } from "jsonwebtoken"
import { MyContext } from "../types/MyContext"

export const IsAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const token = context.req.cookies['access-token']

  if (!token) {
    throw new Error("Not authenticated");
  }
  try {
    const payload = verify(token, <string>process.env.ACCESS_TOKEN_SECRET);
    context.payload = payload as any;
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }
    throw new Error("Not authenticated");
  }
  return next();
};