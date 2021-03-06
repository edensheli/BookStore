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
import { Author } from "../../common/interfaces/Author";
import { DELETE_AUTHOR } from "../../hooks/author/deleteAuthor";
import {
  GET_AUTHORS,
  useGetAllAuthors,
} from "../../hooks/author/useGetAllAuthors";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AuthorModal from "./AuthorModal";

function AuthorsTable() {
  const [modalShow, setModalShow] = React.useState(false);
  const [authors, setAuthors] = useState<Author[] | undefined>();
  const [modal, setModal] = useState(<></>);
  const [removeAuthor] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const firstLoad = useGetAllAuthors();

  useEffect(() => {
    setAuthors(firstLoad?.getAllAuthors);
  }, [firstLoad]);

  const deleteAuthor = async (email: string | undefined) => {
    try {
      removeAuthor({ variables: { email } });
    } catch {}
  };

  const editAuthor = (author: Author) => {
    setModal(
      <AuthorModal
      id={author._id}
        method="edit"
        firstName={author.firstName}
        lastName={author.lastName}
        email={author.email}
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
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors?.map((author: Author) => (
              <TableRow key={author._id}>
                <TableCell component="th" scope="row">
                  {author.firstName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {author.lastName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {author.email}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    component="span"
                    onClick={() => deleteAuthor(author.email)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    component="span"
                    onClick={() => editAuthor(author)}
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

export default AuthorsTable;
