import styled from "styled-components";
import Button from "../common/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { queryString } from "../../constants/queryString";
import { useEffect } from "react";

const viewOptions = [
  {
    view: "list" as Viewmode,
    icon: <FaList />,
  },
  {
    view: "grid" as Viewmode,
    icon: <FaTh />,
  },
];

export type Viewmode = "grid" | "list";

const BooksViewSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (view: Viewmode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(queryString.VIEW, view);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(queryString.VIEW)) {
      handleSwitch("grid");
    }
  }, []);

  return (
    <StBooksViewSwitcher>
      {viewOptions.map((option) => (
        <Button
          size="small"
          scheme={
            searchParams.get(queryString.VIEW) === option.view
              ? "primary"
              : "normal"
          }
          key={option.view}
          onClick={() => handleSwitch(option.view)}
        >
          {option.icon}
        </Button>
      ))}
    </StBooksViewSwitcher>
  );
};

const StBooksViewSwitcher = styled.div`
  display: flex;
  gap: 8px;

  svg {
    fill: white;
  }
`;

export default BooksViewSwitcher;
