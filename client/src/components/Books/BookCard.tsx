import React from "react";
import { Card } from "react-bootstrap";

function BookCard(props: any) {
  const book = props.book;
  return (
    <Card bg="info" text="white" style={{ width: "18rem" }} className="mb-2">
      <Card.Header>{book?.title}</Card.Header>
      <Card.Body>
        <Card.Title>{book?.author.firstName}</Card.Title>
        <Card.Text>{book?.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
