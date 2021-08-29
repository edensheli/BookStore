import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Typegoose } from "typegoose";
import { Author } from "./Author";
import { Category } from "./Category";


@ObjectType()
export class Book extends Typegoose {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String, { nullable: false })
  @prop({ required: true })
  public title!: string;

  @Field(() => Author, { nullable: false })
  @prop({ ref: 'Author', required: true })
  public author!: Ref<Author>;

  @Field(() => Category, { nullable: false })
  @prop({ ref: 'Category', required: true })
  public category!: Ref<Category>;

  @Field(() => Int, { nullable: false })
  @prop({ required: true })
  public price!: number;

}

export const BookModel = getModelForClass(Book)