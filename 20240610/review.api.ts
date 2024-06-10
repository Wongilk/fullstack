import { BookReview, BookReviewItemAdd } from "@models/book.model";
import { requestHandler } from "./http";

export const fetchBookReview = async (bookId: string) => {
  return await requestHandler<BookReview>("get", `/reviews/${bookId}`);
};

export const addBookReview = async (
  bookId: string,
  payload: BookReviewItemAdd
) => {
  return await requestHandler("post", `/reviews/${bookId}`, payload);
};
