import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { icon, input, sideForm } from "./SideForm.css";
import { useTypedDisptach } from "../../../hooks/redux";
import { addBoard } from "../../../store/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";

type Props = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideForm = ({ setIsFormOpen }: Props) => {
  const [inputText, setInputText] = useState("");
  const dispatch = useTypedDisptach();
  const inputTextChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsFormOpen(false);
  };

  const inputCheckClickHandler = () => {
    if (!inputText) return;
    dispatch(
      addBoard({
        boardId: uuidv4(),
        boardName: inputText,
        lists: [],
      })
    );
    dispatch(
      addLog({
        logId: uuidv4(),
        logAuthor: "",
        logMessage: `게시판 등록 : ${inputText}`,
        logTimeStamp: new Date().toLocaleString(),
      })
    );
  };
  return (
    <div className={sideForm}>
      <input
        className={input}
        autoFocus
        type="text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={inputTextChangeHandler}
        onBlur={inputBlurHandler}
      />
      <FiCheck className={icon} onMouseDown={inputCheckClickHandler} />
    </div>
  );
};

export default SideForm;
