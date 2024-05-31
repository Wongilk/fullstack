import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../models/book.model";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { queryString } from "../../constants/queryString";
import { Viewmode } from "./BooksViewSwitcher";

interface Props {
  books: Book[];
}

const BooksList = ({ books }: Props) => {
  const location = useLocation();
  const [view, setView] = useState<Viewmode>("grid");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(queryString.VIEW)) {
      setView(params.get(queryString.VIEW) as Viewmode);
    }
  }, [location.search]);

  return (
    <StBooksList view={view}>
      {books.map((book) => (
        <BookItem book={book} key={book.id} view={view} />
      ))}
    </StBooksList>
  );
};

const StBooksList = styled.div<{ view: Viewmode }>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === "grid" ? "repeat(4,1fr)" : "repeat(1,1fr)"};
  gap: 24px;
`;

export default BooksList;
