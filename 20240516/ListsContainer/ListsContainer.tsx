import { Tlist } from "../../types";
import ActionButton from "../ActionButton/ActionButton";
import List from "../List/List";
import { container } from "./ListsContainer.css";

type Props = {
  lists: Tlist[];
  boardId: string;
};

const ListsContainer = ({ lists, boardId }: Props) => {
  return (
    <div className={container}>
      {lists.map((list) => (
        <List key={list.listId} list={list} boardId={boardId} />
      ))}

      <ActionButton boardId={boardId} listId={""} list />
    </div>
  );
};

export default ListsContainer;
