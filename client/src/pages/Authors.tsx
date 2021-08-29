import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import AuthorModal from "../components/Authors/AuthorModal";
import AuthorsTable from "../components/Authors/AuthorsTable";

function Authors() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={6}>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add New Author
          </Button>
          <AuthorModal
            method="add"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Col>
      </Row>
      <Row className="mt-5 justify-content-md-center">
        <Col xs={12} xl={8}>
          <AuthorsTable />
        </Col>
      </Row>
    </Container>
  );
}

export default Authors;
