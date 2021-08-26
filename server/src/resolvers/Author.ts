import { Author, AuthorModel } from '../models'
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class AuthorResolver {
  @Query(() => [Author], { nullable: true })
  async getAllAuthors(): Promise<Author[] | null> {
    return await AuthorModel.find({})
  }

  @Mutation(() => Author)
  async addAuthor(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
  ): Promise<Author> {
    const newAuthor = (await AuthorModel.create({ firstName, lastName, email })).save()
    return newAuthor
  }

  @Mutation(() => Author)
  async removeAuthor(
    @Arg('email') email: string,
  ): Promise<string> {
    const author = await AuthorModel.findOne({ email })
    if (!author) {
      return `No Author was found with the email: ${email}`;
    }
    return `${author.firstName} ${author.lastName} is deleted!`
  }
}


