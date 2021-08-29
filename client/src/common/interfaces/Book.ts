import { Author } from "./Author"
import { Catergory } from "./Category";

export interface Book {
  _id?: string
  title: string
  author: Author
  category: Catergory
  price: number;
}

