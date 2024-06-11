import Title from "../components/common/Title";
import styled from "styled-components";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import Pagination from "../components/books/Pagination";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { useBooks } from "../hooks/useBooks";
import Empty from "../components/common/Empty";
import { Link } from "react-router-dom";
import { FaSmileWink } from "react-icons/fa";
import Loading from "@components/common/Loading";
import { useBooksInfinite } from "@hooks/useBooksInfinite";
import Button from "@components/common/Button";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";

const Books = () => {
  const {
    books,
    pagination,
    isEmpty,
    isFetching: isBooksPeding,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  // const moreRef = useIntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       console.log("intersecting");
  //       loadMore();
  //     }
  //   });
  // });
  const moreRef = useRef(null);
  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMore();
          observer.unobserve(entry.target);
        }
      });
    });

    if (moreRef.current) {
      observer.observe(moreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [books, moreRef]);

  if (isBooksPeding || !books || !pagination) return <Loading />;
  if (isEmpty)
    return (
      <Empty
        icon={<FaSmileWink />}
        title="검색 결과가 없습니다."
        description={<Link to={"/books"}>전체 검색 결과로 이동</Link>}
      />
    );
  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <StBooks>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        {/* <Pagination pagination={pagination} /> */}
        <div className="more" ref={moreRef}>
          <Button
            size="small"
            scheme="normal"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            {hasNextPage ? "더보기" : "마지막 페이지"}
          </Button>
        </div>
      </StBooks>
    </>
  );
};

const StBooks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
`;
export default Books;
