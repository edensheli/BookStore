import { MiddlewareFn } from "type-graphql"
import { verify } from "jsonwebtoken"
import { MyContext } from "../types/MyContext"

export const IsAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const token = context.req.cookies['access-token']

  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    const payload = verify(token, "sdasdasdasdsa");
    console.log(payload);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }
  return next();
};