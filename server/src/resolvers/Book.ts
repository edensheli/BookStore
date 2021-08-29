import { AuthorModel, Book, BookModel, CategoryModel } from '../models'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuth } from '../middleware/IsAuth';
import { BookInput } from '../types/Input/BookInput';

@Resolver()
export class BookResolver {

  @Query(() => Book, { nullable: true })
  async getBook(@Arg('bookId') bookId: string): Promise<Book> {
    const book = await BookModel.findById(bookId).populate('author').populate('category').exec()
    if (!book) {
      throw new Error('no Book found')
    }
    return book
  }

  @Query(() => [Book], { nullable: true })
  async getBooksByAuthor(@Arg('authorId') authorId: string): Promise<Book[] | null> {
    const author = await AuthorModel.findById(authorId)

    if (!author) {
      throw new Error("no author found")
    }

    const books = await BookModel.find({ author }).populate('author').populate('category').exec()
    return books
  }

  @Query(() => [Book], { nullable: true })
  async getAllBooks(): Promise<Book[] | null> {
    const books = await BookModel.find({}).populate('author').populate('category').exec()
    return books
  }

  @Query(() => [Book])
  async getBooksByCategory(@Arg('categoryId') categoryId: string): Promise<Book[]> {
    const category = await CategoryModel.findById(categoryId)

    if (!category) {
      throw new Error("no category found")
    }
    const books = await BookModel.find({ category }).populate('author').populate('category').exec()
    return books
  }

  @Mutation(() => Book)
  @UseMiddleware(IsAuth)
  async addBook(
    @Arg('book') { title, authorId, categoryId, price }: BookInput,
  ): Promise<Book> {
    const author = await AuthorModel.findById(authorId)
    if (!author) {
      throw new Error("no author found")
    }
    const category = await CategoryModel.findById(categoryId)
    if (!category) {
      throw new Error("no category found")
    }
    const book = await (await BookModel.create({ title, author, category, price })).save()
    return book
  }

  @Mutation(() => Book)
  @UseMiddleware(IsAuth)
  async updateBook(
    @Arg('book') { bookId, title, categoryId, price }: BookInput,
  ): Promise<Book> {
    const book = await BookModel.findById(bookId)
    if (!book) {
      throw new Error("no book found")
    }
    const category = await CategoryModel.findById(categoryId)

    if (!category) {
      throw new Error("no category found")
    }
    await book.updateOne({ title, category, price }).populate('author').populate('category').exec()
    return book
  }
}


