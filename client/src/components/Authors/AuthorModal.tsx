import {  useMutation } from "@apollo/client";
import { Input } from "@material-ui/core";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ADD_AUTHOR } from "../../hooks/author/addAuthor";
import { UPDATE_AUTHOR } from "../../hooks/author/updateAuthor";
import { GET_AUTHORS } from "../../hooks/author/useGetAllAuthors";

function AuthorModal(props: any) {
  const [firstName, setFirstName] = useState(
    props.firstName ? props.firstName : ""
  );
  const [lastName, setLastName] = useState(
    props.lastName ? props.lastName : ""
  );
  const [email, setEmail] = useState(props.email ? props.email : "");

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const saveChanges = async () => {
    try {
      if (props.method === "add") {
        await addAuthor({
          variables: { data: { firstName, lastName, email } },
        });
      } else if (props.method === "edit") {
        await updateAuthor({
          variables: { data: { id: props.id, firstName, lastName, email } },
        });
      }
    } catch (err: any) {
      alert(err);
    }

    props.onHide();
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.method} Author
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Author details</h4>
        <Input
          value={firstName}
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
        <Input
          value={lastName}
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />
        <Input
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={() => saveChanges()}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AuthorModal;
