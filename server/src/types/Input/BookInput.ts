import { Field, InputType, Int } from "type-graphql";

@InputType()
export class BookInput {

  @Field(() => String, { nullable: true })
  bookId?: string;

  @Field(() => String)
  title: string;

  @Field(() => String,{ nullable: true })
  authorId?: string;

  @Field(() => String,{ nullable: true })
  categoryId: string;

  @Field(() => Int)
  price: number;

}