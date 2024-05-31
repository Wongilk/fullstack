import { Pagination as _Pagination } from "../../models/pagination.model";
import styled from "styled-components";
import Button from "../common/Button";
import { LIMIT } from "../../constants/pagination";
import { useSearchParams } from "react-router-dom";
import { queryString } from "../../constants/queryString";

interface Props {
  pagination: _Pagination;
}

const Pagination = ({ pagination }: Props) => {
  const { totalBooksCount, currentPage } = pagination;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(queryString.CURRENT_PAGE, page.toString());

    setSearchParams(newSearchParams);
  };

  const pages = Math.ceil(totalBooksCount / LIMIT);

  return (
    <StPagination>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <Button
                  size="small"
                  scheme={currentPage === index + 1 ? "primary" : "normal"}
                  onClick={() => handleClickPage(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </StPagination>
  );
};

const StPagination = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px 0;

  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;
export default Pagination;
