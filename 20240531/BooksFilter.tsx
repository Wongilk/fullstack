import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { queryString } from "../../constants/queryString";

const BooksFilter = () => {
  const category = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (id === null) {
      newSearchParams.delete(queryString.CATEGORY_ID);
    } else {
      newSearchParams.set(queryString.CATEGORY_ID, id.toString());
    }
    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(queryString.IS_NEW)) {
      newSearchParams.delete(queryString.IS_NEW);
    } else {
      newSearchParams.set(queryString.IS_NEW, "true");
    }
    setSearchParams(newSearchParams);
  };

  return (
    <StBooksFilter>
      <div className="category">
        {category.map((item) => (
          <Button
            size="small"
            scheme={item.isActive ? "primary" : "normal"}
            key={item.categoryId}
            onClick={() => handleCategory(item.categoryId)}
          >
            {item.categoryName}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          size="small"
          scheme={searchParams.get(queryString.IS_NEW) ? "primary" : "normal"}
          onClick={handleNews}
        >
          신간
        </Button>
      </div>
    </StBooksFilter>
  );
};

const StBooksFilter = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;
export default BooksFilter;
