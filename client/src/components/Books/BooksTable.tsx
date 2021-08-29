import { useMutation } from "@apollo/client";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DELETE_AUTHOR } from "../../hooks/author/deleteAuthor";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import BookModal from "./BookModal";
import { GET_BOOKS, useGetAllBooks } from "../../hooks/book/useGetAllBooks";
import { Book } from "../../common/interfaces/Book";

function BooksTable() {
  const [modalShow, setModalShow] = React.useState(false);
  const [books, setBooks] = useState<Book[] | undefined>();
  const [modal, setModal] = useState(<></>);
  const [removeBook] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const firstLoad = useGetAllBooks();

  useEffect(() => {
    setBooks(firstLoad?.getAllBooks);
  }, [firstLoad]);

  const deleteBook = async (id: string | undefined) => {
    try {
      removeBook({ variables: { id } });
    } catch {}
  };

  const editBook = (book: Book) => {
    setModal(
      <BookModal
        id={book._id}
        method="edit"
        title={book.title}
        price={book.price}
        author={book.author}
        category={book.category}
        show={true}
        onHide={() => setModalShow(false)}
      />
    );
    setModalShow(true);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book: Book) => (
              <TableRow key={book._id}>
                <TableCell component="th" scope="row">
                  {book.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {book.author.firstName} {book.author.lastName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {book.category.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {book.price}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    component="span"
                    onClick={() => deleteBook(book._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    component="span"
                    onClick={() => editBook(book)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {modalShow && modal}
    </>
  );
}

export default BooksTable;
