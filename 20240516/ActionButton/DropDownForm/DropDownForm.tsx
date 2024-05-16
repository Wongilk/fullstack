import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDisptach } from "../../../hooks/redux";
import { addList, addTask } from "../../../store/slices/boardsSlice";
import { v4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";
import {
  button,
  buttons,
  close,
  input,
  listForm,
  taskForm,
} from "./DropDownForm.css";

type Props = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list?: boolean;
  boardId: string;
  listId: string;
};

const DropDownForm = ({ setIsFormOpen, list, boardId, listId }: Props) => {
  const [inputText, setInputText] = useState("");
  const dispatch = useTypedDisptach();

  const formPlaceHolder = list
    ? "리스트의 제목을 입력하세요"
    : "일의 제목을 입력하세요";
  const buttonText = list ? "리스트 추가하기" : "일 추가하기";

  const inputTextChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputText(e.target.value);
  };

  const addBtnClickHandler = () => {
    if (!inputText) return;

    if (list) {
      dispatch(
        addList({
          boardId,
          list: {
            listId: v4(),
            listName: inputText,
            tasks: [],
          },
        })
      );
    } else {
      dispatch(
        addTask({
          boardId,
          listId,
          task: {
            taskDescription: "",
            taskId: v4(),
            taskName: inputText,
            taskOwner: "User",
          },
        })
      );
    }
    dispatch(
      addLog({
        logId: v4(),
        logAuthor: "User",
        logMessage: `${list ? "리스트" : "일"}생성 ${inputText}`,
        logTimeStamp: new Date().toLocaleString(),
      })
    );
  };
  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        className={input}
        autoFocus
        placeholder={formPlaceHolder}
        value={inputText}
        onChange={inputTextChangeHandler}
        onBlur={() => setIsFormOpen(false)}
      />

      <div className={buttons}>
        <button className={button} onMouseDown={addBtnClickHandler}>
          {buttonText}
        </button>
        <FiX className={close} />
      </div>
    </div>
  );
};

export default DropDownForm;
