import React, { useState, useEffect } from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";
import {
  useGetCategories,
  GET_CATEGORIES,
} from "../../hooks/category/useGetCategories";
import { DELETE_CATEGORY } from "../../hooks/category/deleteCategory";
import { useMutation } from "@apollo/client";
import { Catergory } from "../../common/interfaces/Category";

function CategoriesTable() {
  const [categories, setCategories] = useState<Catergory[] | undefined>();
  const [removeCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const firstLoad = useGetCategories();

  useEffect(() => {
    setCategories(firstLoad?.getAllCategories);
  }, [firstLoad]);

  const DeleteCategory = async (id: string | undefined) => {
    removeCategory({ variables: { id } });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map((category: Catergory) => (
            <TableRow key={category.name}>
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  component="span"
                  onClick={() => DeleteCategory(category._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CategoriesTable;
