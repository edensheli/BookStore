import {  useMutation } from "@apollo/client";
import { Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Author } from "../../common/interfaces/Author";
import { Catergory } from "../../common/interfaces/Category";
import { useGetAllAuthors } from "../../hooks/author/useGetAllAuthors";
import { ADD_BOOK } from "../../hooks/book/addBook";
import { UPDATE_BOOK } from "../../hooks/book/updateBook";
import { GET_BOOKS } from "../../hooks/book/useGetAllBooks";
import { useGetCategories } from "../../hooks/category/useGetCategories";

function BookModal(props: any) {
  const [title, setTitle] = useState(props.title ? props.title : "");
  const [price, setPrice] = useState<number>(props.price ? props.price : 0);
  const [author, setAuthor] = useState<Author | undefined>(
    props.author ? props.author : undefined
  );
  const [category, setCategory] = useState<Catergory | undefined>(
    props.category ? props.category : undefined
  );

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const authors: Author[] = useGetAllAuthors()?.getAllAuthors;
  const categories: Catergory[] = useGetCategories()?.getAllCategories;

  const saveChanges = async () => {
    try {
      if (props.method === "add") {
        await addBook({
          variables: {
            book: {
              title,
              price,
              authorId: author?._id,
              categoryId: category?._id,
            },
          },
        });
      } else if (props.method === "edit") {
        await updateBook({
          variables: {
            book: {
              bookId: props.id,
              title,
              price,
              authorId: author?._id,
              categoryId: category?._id,
            },
          },
        });
      }
    } catch (err: any) {
      alert(err);
    }

    props.onHide();
    setTitle("");
    setPrice(0);
    setAuthor(undefined);
    setCategory(undefined);
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
          {props.method} Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Book details</h4>
        <Input
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Input
          type="number"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(parseInt(e.target.value))}
          fullWidth
        />
        <InputLabel>Author</InputLabel>
        <Select
          fullWidth
          value={author?._id}
          onChange={(e) =>
            setAuthor(
              authors.find((authorFind) => authorFind._id === e.target.value)
            )
          }
        >
          {authors?.map((a: Author) => {
            return (
              <MenuItem key={a._id} value={a._id}>
                {a.firstName} {a.lastName}
              </MenuItem>
            );
          })}
        </Select>
        <InputLabel>Category</InputLabel>
        <Select
          fullWidth
          value={category?._id}
          onChange={(e) =>
            setCategory(
              categories.find(
                (categoryFind) => categoryFind._id === e.target.value
              )
            )
          }
        >
          {categories?.map((c: Catergory) => {
            return (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            );
          })}
        </Select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={() => saveChanges()}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookModal;
