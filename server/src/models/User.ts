import { getModelForClass, prop  } from "@typegoose/typegoose";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { Typegoose } from "typegoose";
import * as bcrypt from 'bcryptjs'

@ObjectType()
export class User extends Typegoose {
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
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`
  }

  @prop({ required: true })
  password!: string;

  public async comparePassword(this: User, password: string) {
    
    return await bcrypt.compare(password, this.password)
  }
}

export const UserModel = getModelForClass(User)