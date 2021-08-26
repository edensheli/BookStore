import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { Typegoose } from "typegoose";

@ObjectType()
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
  @prop({ unique: true, required: true })
  public email!: string;

  @Field()
  name(@Root() parent: Author): string {
    return `${parent.firstName} ${parent.lastName}`
  }

}

export const AuthorModel = getModelForClass(Author)