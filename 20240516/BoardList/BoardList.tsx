import { useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiPlusCircle } from "react-icons/fi";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import clsx from "clsx";

type Props = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList = ({ activeBoardId, setActiveBoardId }: Props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { boardArray } = useTypedSelector((state) => state.boards);

  const circleClickHandler = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className={container}>
      <div className={title}>게시판 :</div>
      {boardArray.map((board) => (
        <div
          onClick={() => setActiveBoardId(board.boardId)}
          key={board.boardId}
          className={clsx(
            {
              [boardItemActive]: board.boardId === activeBoardId,
            },
            {
              [boardItem]: board.boardId !== activeBoardId,
            }
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={circleClickHandler} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
