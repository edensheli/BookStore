import { Category, CategoryModel } from '../models'
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category], { nullable: true })
  async getAllCategories(): Promise<Category[] | null> {
    return await CategoryModel.find({})
  }

  @Mutation(() => Category)
  async addCategory(
    @Arg('name') name: string,
  ): Promise<Category> {
    const newCategory = (await CategoryModel.create({ name })).save()
    return newCategory
  }

  @Mutation(() => Category)
  async removeCategory(
    @Arg('name') name: string,
  ): Promise<string> {
    const category = await CategoryModel.findOne({ name })
    if (!category) {
      return `No category was found with the name ${name}`;
    }
    return `${name} deleted!`
  }
}


