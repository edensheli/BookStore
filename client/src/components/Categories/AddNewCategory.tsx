import { useMutation } from "@apollo/client";
import { Input } from "@material-ui/core";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ADD_CATEGORY } from "../../hooks/category/addCategory";

function AddNewCategory() {
  const [modalShow, setModalShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const [addCategory] = useMutation(ADD_CATEGORY);

  const createCategory = (name: string) => {
    addCategory({ variables: { name } });
    setModalShow(false);
    window.location.reload();
  };

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add new category
      </Button>
      <Modal
        show={modalShow}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Insert Category Name</h4>
          <Input onChange={(e) => setCategoryName(e.target.value)} fullWidth />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => createCategory(categoryName)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewCategory;
