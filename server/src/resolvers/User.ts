import { User, UserModel } from '../models'
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { MyContext } from 'src/types/MyContext';
import { IsAuth } from '../middleware/IsAuth';

@ObjectType()
class LoginMessage {

  @Field(() => String, { nullable: false })
  message!: string

  @Field(() => User, { nullable: true })
  user: User | null

  constructor(msg: string, user: User | null = null) {
    this.message = msg
    this.user = user
  }
}

@Resolver()
export class UserResolver {

  @Query(() => User)
  @UseMiddleware(IsAuth)
  async me(@Ctx() { payload }: MyContext): Promise<User | null> {
    return await UserModel.findById(payload!.userId);
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const salt = await genSalt();
    const hashPassword = await hash(password, salt)
    const newUser = await UserModel.create({ firstName, lastName, email, password: hashPassword })
    return await newUser.save()
  }

  @Mutation(() => LoginMessage)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<LoginMessage> {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return new LoginMessage("no user found")
    }
    const verify = await compare(password, user.password);

    if (!verify) {
      return new LoginMessage("password incorrect")
    }

    const refreshToken = sign({ userId: user._id }, 'sdasdasdasdsa', { expiresIn: '7d' })
    const accessToken = sign({ userId: user._id }, 'sdasdasdasdsa', { expiresIn: '60min' })
    ctx.res.cookie('refresh-token', refreshToken)
    ctx.res.cookie('access-token', accessToken)
    return new LoginMessage("login success!", user)
  }
}