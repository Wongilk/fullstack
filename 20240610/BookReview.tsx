import {
  BookReviewItemAdd,
  BookReview as _BookReview,
} from "@models/book.model";
import styled from "styled-components";
import BookReviewItem from "./BookReviewItem";
import AddBookReview from "./AddBookReview";

interface Props {
  reviews: _BookReview[];
  onAdd: (data: BookReviewItemAdd) => void;
}

const BookReview = ({ reviews, onAdd }: Props) => {
  return (
    <StBookReview>
      <AddBookReview onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReviewItem review={review} key={review.id} />
      ))}
    </StBookReview>
  );
};

const StBookReview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export default BookReview;
