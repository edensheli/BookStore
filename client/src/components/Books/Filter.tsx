import React, { useState, useEffect } from "react";
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import { useGetAllAuthors } from "../../hooks/author/useGetAllAuthors";
import { Author } from "../../common/interfaces/Author";
import { Catergory } from "../../common/interfaces/Category";
import { useGetCategories } from "../../hooks/category/useGetCategories";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

function Filter(props: any) {
  const classes = useStyles();
  const firstAuthorsLoad = useGetAllAuthors();
  const firstCategoriesLoad = useGetCategories();
  const [authors, setAuthors] = useState<Author[] | undefined>([]);
  const [categories, setCategories] = useState<Catergory[] | undefined>([]);
  const [authorID, setAuthorID] = useState<string | unknown>("");
  const [categoryID, setCategoryID] = useState<string | unknown>("");

  useEffect(() => {
    setAuthors(firstAuthorsLoad?.getAllAuthors);
    setCategories(firstCategoriesLoad?.getAllCategories);
  }, [firstAuthorsLoad, firstCategoriesLoad]);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Author</InputLabel>
        <Select
          value={authorID}
          onChange={(e) => {
            setCategoryID("");
            setAuthorID(e.target.value);
            props.filterByAuthor(e.target.value);
          }}
        >
          {authors &&
            authors?.map((author: Author) => {
              return (
                <MenuItem key={author?._id} value={author?._id}>
                  {author.firstName} {author.lastName}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryID}
          onChange={(e) => {
            setAuthorID("");
            setCategoryID(e.target.value);
            props.filterByCategory(e.target.value);
          }}
        >
          {categories &&
            categories?.map((category: Catergory) => {
              return (
                <MenuItem key={category?._id} value={category?._id}>
                  {category.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
}

export default Filter;
