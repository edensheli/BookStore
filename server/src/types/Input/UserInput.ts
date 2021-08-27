import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {

  @Field(() => String)
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  password: string;
}