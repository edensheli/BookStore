import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AddNewCategory from "../components/Categories/AddNewCategory";
import CategoriesTable from "../components/Categories/CategoriesTable";

function Categories() {
  return (
    <Container>
      <Row className="mt-5">
        <Col xs={6}>
          <AddNewCategory />
        </Col>
      </Row>
      <Row className="mt-5 justify-content-md-center">
        <Col xs={12} xl={8}>
          <CategoriesTable />
        </Col>
      </Row>
    </Container>
  );
}

export default Categories;
