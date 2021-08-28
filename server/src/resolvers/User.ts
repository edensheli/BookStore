import { User, UserModel } from '../models'
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { MyContext } from '../types/MyContext';
import { IsAuth } from '../middleware/IsAuth';
import { RegisterInput } from '../types/Input/UserInput';


@Resolver()
export class UserResolver {

  @Query(() => User)
  @UseMiddleware(IsAuth)
  async me(@Ctx() { payload }: MyContext): Promise<User | null> {
    return await UserModel.findById(payload!.userId);
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { password, email, firstName, lastName }: RegisterInput
  ): Promise<User> {
    const salt = await genSalt();
    const hashPassword = await hash(password, salt)
    const newUser = await UserModel.create({ firstName, lastName, email, password: hashPassword })
    return await newUser.save()
  }

  @Mutation(() => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error("no user found")
    }
    const verify = await compare(password, user.password);

    if (!verify) {
      throw new Error("password incorrect")
    }

    const accessToken = sign({ userId: user._id }, <string>process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
    ctx.res.cookie('access-token', accessToken, { maxAge: 86400000, httpOnly: true })
    return user
  }

  @Mutation(() => String)
  @UseMiddleware(IsAuth)
  logout(@Ctx() ctx: MyContext) {
    ctx.res.clearCookie('access-token')
    return "user logout";
  }
}