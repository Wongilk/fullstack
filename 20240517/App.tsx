import { useState } from "react";
import {
  appContainer,
  board,
  buttons,
  deleteBoardButton,
  loggerButton,
} from "./App.css";
import BoardList from "./components/BoardList/BoardList";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useTypedDisptach, useTypedSelector } from "./hooks/redux";
import EditModal from "./components/EditModal/EditModal";
import LoggerModal from "./components/LoggerModal/LoggerModal";
import { deleteBoard } from "./store/slices/boardsSlice";
import { addLog } from "./store/slices/loggerSlice";
import { v4 } from "uuid";

function App() {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  const { boardArray, modalActive } = useTypedSelector((state) => state.boards);
  const dispatch = useTypedDisptach();

  const selectedBoard = boardArray.filter(
    (board) => board.boardId === activeBoardId
  )[0];

  const deleteBoardHandler = () => {
    if (boardArray.length > 1) {
      dispatch(deleteBoard(selectedBoard.boardId));

      dispatch(
        addLog({
          logId: v4(),
          logAuthor: "User",
          logMessage: `게시판 삭제 : ${selectedBoard}`,
          logTimeStamp: new Date().toLocaleString(),
        })
      );

      const newIndex = () => {
        const indexToBeDeleted = boardArray.findIndex(
          (board) => board.boardId === activeBoardId
        );

        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted - 1;
      };

      setActiveBoardId(boardArray[newIndex()].boardId);
    } else {
      alert("게시판 개수는 최소 1개 이상입니다.");
    }
  };

  return (
    <div className={appContainer}>
      {isLoggerOpen && <LoggerModal setIsLoggerOpen={setIsLoggerOpen} />}
      {modalActive && <EditModal />}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListsContainer
          lists={selectedBoard.lists}
          boardId={selectedBoard.boardId}
        />
      </div>

      <div className={buttons}>
        <button className={deleteBoardButton} onClick={deleteBoardHandler}>
          이 게시판 삭제하기
        </button>
        <button
          className={loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}
        >
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  );
}

export default App;
