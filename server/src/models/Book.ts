import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Typegoose } from "typegoose";
import { Author } from "./Author";
import { Category } from "./Category";

@ObjectType()
export class Book extends Typegoose {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true })
  public Title!: string;

  @Field(() => Author, { nullable: false })
  @prop({ required: true })
  public author!: Author;

  @Field(() => Category, { nullable: false })
  @prop({ required: true })
  public category!: Category;

  @Field(() => Int, { nullable: false })
  @prop({ required: true })
  public price!: number;

}

export const BookModel = getModelForClass(Book)