import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { queryString } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBooksInfinite = () => {
  const location = useLocation();

  const getBooks = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get(queryString.CATEGORY_ID)
      ? Number(params.get(queryString.CATEGORY_ID))
      : undefined;
    const isNew = params.get(queryString.IS_NEW) ? true : false;
    const currentPage = pageParam;
    const limit = LIMIT;

    return fetchBooks({
      categoryId,
      isNew,
      currentPage,
      limit,
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["books", location.search],
    queryFn: getBooks,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const isLast =
        Math.ceil(lastPage.pagination.totalBooksCount / LIMIT) ===
        lastPage.pagination.currentPage;
      return isLast ? null : lastPage.pagination.currentPage + 1;
    },
  });

  const books = data ? data.pages.flatMap((page) => page.books) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};

  return {
    books: books,
    pagination: pagination,
    isEmpty: books.length === 0,
    isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
