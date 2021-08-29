import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import BookModal from "../components/Books/BookModal";
import BooksTable from "../components/Books/BooksTable";

function Books() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={6}>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add New Book
          </Button>
          <BookModal
            method="add"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Col>
      </Row>
      <Row className="mt-5 justify-content-md-center">
        <Col xs={12} xl={8}>
          <BooksTable />
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
