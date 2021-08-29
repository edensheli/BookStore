import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Book } from "../common/interfaces/Book";
import BookDeck from "../components/Books/BookDeck";
import Filter from "../components/Books/Filter";
import { useGetAllBooks } from "../hooks/book/useGetAllBooks";
import { useGetBooksByAuthor } from "../hooks/book/useGetByAuthor";
import { useGetBooksByCategory } from "../hooks/book/useGetByCategory";

function Home() {
  const [books, setBooks] = useState<Book[] | undefined>([]);
  const { booksByAuthor, loadBooksByAuthor } = useGetBooksByAuthor(null);
  const { booksByCategory, loadBooksByCategory } = useGetBooksByCategory(null);
  const firstLoad = useGetAllBooks();

  useEffect(() => {
    setBooks(firstLoad?.getAllBooks);
  }, [firstLoad]);

  useEffect(() => {
    setBooks(booksByAuthor?.getBooksByAuthor);
  }, [booksByAuthor?.getBooksByAuthor]);

  useEffect(() => {
    setBooks(booksByCategory?.getBooksByCategory);
  }, [booksByCategory?.getBooksByCategory]);

  async function filterByAuthor(authorId: string) {
    await loadBooksByAuthor({ authorId });
  }

  async function filterByCategory(categoryId: string) {
    await loadBooksByCategory({ categoryId });
  }

  return (
    <Container className="mt-5">
      <Filter
        filterByAuthor={filterByAuthor}
        filterByCategory={filterByCategory}
      />
      <BookDeck books={books} />
    </Container>
  );
}

export default Home;
