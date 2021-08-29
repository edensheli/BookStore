import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Book } from "../../common/interfaces/Book";
import BookCard from "./BookCard";

function BookDeck(props: any) {
  const [books, setBooks] = useState<Book[]>(props.books);

  useEffect(() => {
    setBooks(props.books);
  }, [props.books]);

  return (
    <Container className="mt-5">
      <Row xs={1} md={5} className="g-4">
        {books?.length > 0 ? (
          books?.map((book: Book) => (
            <Col key={book._id}>
              <BookCard book={book} />
            </Col>
          ))
        ) : (
          <h1>No Books Found</h1>
        )}
      </Row>
    </Container>
  );
}

export default BookDeck;
