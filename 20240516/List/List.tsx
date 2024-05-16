import { GrSubtract } from "react-icons/gr";
import { TTask, Tlist } from "../../types";
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import { useTypedDisptach } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { container, deleteButton, header, name } from "./List.css";

type Props = {
  list: Tlist;
  boardId: string;
};

const List = ({ list, boardId }: Props) => {
  const dispatch = useTypedDisptach();

  const listDeleteHandler = (listId: string) => {
    dispatch(
      deleteList({
        boardId,
        listId,
      })
    );
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기 : ${list.listName}`,
        logAuthor: "User",
        logTimeStamp: new Date().toLocaleString(),
      })
    );
  };

  const taskClickHandler = (boardId: string, listId: string, task: TTask) => {
    dispatch(
      setModalData({
        boardId,
        listId,
        task,
      })
    );
    dispatch(setModalActive(true));
  };

  return (
    <div className={container}>
      <div className={header}>
        <div className={name}>{list.listName}</div>
        <GrSubtract
          className={deleteButton}
          onClick={() => listDeleteHandler(list.listId)}
        />
      </div>
      {list.tasks.map((task, index) => (
        <div
          key={task.taskId}
          onClick={() => taskClickHandler(boardId, list.listId, task)}
        >
          <Task task={task} index={index} />
        </div>
      ))}
      <ActionButton boardId={boardId} listId={list.listId} />
    </div>
  );
};

export default List;
