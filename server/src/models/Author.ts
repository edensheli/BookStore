import { getModelForClass, prop, post } from "@typegoose/typegoose";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { Typegoose } from "typegoose";
import { BookModel } from "./Book";


@ObjectType()
@post<Author>('remove', async function (author) {
  console.log(author);

  await BookModel.remove({ author })
})
export class Author extends Typegoose {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true })
  public firstName!: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true })
  public lastName!: string;

  @Field(() => String, { nullable: false })
  @prop({
    unique: true, required: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  })
  public email!: string;

  @Field()
  name(@Root() parent: Author): string {
    return `${parent.firstName} ${parent.lastName}`
  }
}

export const AuthorModel = getModelForClass(Author)