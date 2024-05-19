import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TBoard, TTask, Tlist } from "../../types";

type TBoardsState = {
  modalActive: boolean;
  boardArray: TBoard[];
};

type TDeleteListAction = {
  boardId: string;
  listId: string;
};

type TAddListAction = {
  boardId: string;
  list: Tlist;
};

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: TTask;
};

type TDeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};
const initialState: TBoardsState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "boardName-0",
      lists: [
        {
          listId: "list-0",
          listName: "listName-0",
          tasks: [
            {
              taskId: "task-0",
              taskName: "taskname-0",
              taskDescription: "taskdescription-0",
              taskOwner: "taskOwner-0",
            },
            {
              taskId: "task-1",
              taskName: "taskname-1",
              taskDescription: "taskdescription-1",
              taskOwner: "taskOwner-1",
            },
          ],
        },
        {
          listId: "list-1",
          listName: "listName-1",
          tasks: [
            {
              taskId: "task-2",
              taskName: "taskname-2",
              taskDescription: "taskdescription-2",
              taskOwner: "taskOwner-2",
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TBoard>) => {
      state.boardArray.push(payload);
    },
    deleteBoard: (state, { payload }: PayloadAction<string>) => {
      state.boardArray = state.boardArray.filter(
        (board) => board.boardId !== payload
      );
    },

    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter(
                (list) => list.listId !== payload.listId
              ),
            }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boardArray.forEach(
        (board) =>
          board.boardId === payload.boardId && board.lists.push(payload.list)
      );
    },
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.forEach(
        (board) =>
          board.boardId === payload.boardId &&
          board.lists.forEach(
            (list) =>
              list.listId === payload.listId && list.tasks.push(payload.task)
          )
      );
    },

    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.forEach(
        (board) =>
          board.boardId === payload.boardId &&
          board.lists.forEach(
            (list) =>
              list.listId === payload.listId &&
              list.tasks.forEach(
                (task, index) =>
                  task.taskId === payload.task.taskId &&
                  (list.tasks[index] = payload.task)
              )
          )
      );
    },

    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray.forEach(
        (board) =>
          board.boardId === payload.boardId &&
          board.lists.forEach(
            (list) =>
              list.listId === payload.listId &&
              (list.tasks = list.tasks.filter(
                (task) => task.taskId !== payload.taskId
              ))
          )
      );
    },
  },
});

export const {
  addBoard,
  deleteList,
  setModalActive,
  addList,
  addTask,
  updateTask,
  deleteTask,
  deleteBoard,
} = boardSlice.actions;
export const boardsReducer = boardSlice.reducer;
