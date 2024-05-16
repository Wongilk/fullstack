import { TTask } from "../../types";
import { container, description, title } from "./Task.css";

type Props = {
  task: TTask;
  index: number;
};

const Task = ({ task, index }: Props) => {
  return (
    <div className={container}>
      <div className={title}>{task.taskName}</div>
      <div className={description}>{task.taskDescription}</div>
    </div>
  );
};

export default Task;
