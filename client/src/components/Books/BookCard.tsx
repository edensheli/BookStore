import React from "react";
import { Card } from "react-bootstrap";
import { Author } from "../../common/interfaces/Author";
import { Book } from "../../common/interfaces/Book";
import { Catergory } from "../../common/interfaces/Category";

function BookCard(props: any) {
  const book: Book = props.book;
  const author: Author = book.author;
  const category: Catergory = book.category;
  return (
    <Card>
      <Card.Header>{book.title}</Card.Header>
      <Card.Body>
        <Card.Text>
          Author: {author.firstName} {author.lastName}
        </Card.Text>
        <Card.Text>Category: {category.name}</Card.Text>
        <Card.Text>Price: {book.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
