import { Author, AuthorModel } from '../models'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuth } from '../middleware/IsAuth';
import { AuthorInput } from '../types/Input/AuthorInput';

@Resolver()
export class AuthorResolver {

  @Query(() => Author, { nullable: true })
  async getAuthor(@Arg('AurtorId') aurthorID: string): Promise<Author> {
    const author = await AuthorModel.findById(aurthorID)
    if (!author) {
      throw new Error("No author found");
    }
    return author
  }

  @Query(() => [Author], { nullable: true })
  async getAllAuthors(): Promise<Author[] | null> {
    return await AuthorModel.find({})
  }

  @Mutation(() => Author)
  @UseMiddleware(IsAuth)
  async addAuthor(
    @Arg('data') { email, firstName, lastName }: AuthorInput
  ): Promise<Author> {

    const emailExist = await AuthorModel.findOne({ email })

    if (emailExist) {
      throw new Error(`${email} already exist!`)
    }

    const newAuthor = await (await AuthorModel.create({ firstName, lastName, email })).save()
    return newAuthor
  }

  @Mutation(() => Author)
  @UseMiddleware(IsAuth)
  async removeAuthor(
    @Arg('email') email: string,
  ): Promise<Author> {
    const author = await AuthorModel.findOne({ email })
    if (!author) {
      throw new Error(`No Author was found with the email: ${email}`);
    }
    return await author.delete()
  }

  @Mutation(() => Author)
  @UseMiddleware(IsAuth)
  async updateAuthor(
    @Arg('data') { id, email, firstName, lastName }: AuthorInput
  ): Promise<Author> {

    const author = await AuthorModel.findById(id)
    if (!author) {
      throw new Error('No author found')
    }
    if (email !== author.email) {
      const alreadyExist = await AuthorModel.findOne({ email })
      if (alreadyExist) {
        throw new Error('Email already exists')
      }
    }

    await author.update({ firstName, lastName, email })
    return author
  }
}