import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Typegoose } from "typegoose";

@ObjectType()
export class Category extends Typegoose {
  @Field(() => ID)
  _id: string;

  @Field(() => String,{nullable: false})
  @prop({ required: true, unique: true })
  public name: string;
}

export const CategoryModel = getModelForClass(Category)