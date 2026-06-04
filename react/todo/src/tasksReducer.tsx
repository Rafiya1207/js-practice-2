import { produce } from "immer";

export enum Action {
  ADD_TASK,
  TOGGLE_TASK,
  ADD_TODO,
  DELETE_TASK,
  DELETE_TODO,
}

export type Task = {
  title: string;
  id: number;
  isDone: boolean;
};

export type TodoList = {
  nextId: number;
  title: string;
  tasks: Task[];
  id: number;
};

export type Todos = { nextId: number; todos: TodoList[] };

export type Dispatch = (x: ActionProps) => void;

export type ActionProps =
  | { type: Action.ADD_TASK; title: string }
  | { type: Action.TOGGLE_TASK; id: number }
  | { type: Action.DELETE_TASK; id: number }
  | { type: Action.DELETE_TODO; id: number }
  | { type: Action.ADD_TODO; title: string };

const addTask = (todoList: TodoList, title: string) =>
  produce(todoList, (draft) => {
    draft.tasks.push({
      title,
      id: draft.nextId++,
      isDone: false,
    });
  });

const toggleTask = (todoList: TodoList, id: number) =>
  produce(todoList, (draft) => {
    const taskIndex = draft.tasks.findIndex((task) => task.id === id);
    draft.tasks[taskIndex].isDone = !draft.tasks[taskIndex].isDone;
  });

const deleteTask = (todoList: TodoList, id: number) =>
  produce(todoList, (draft) => {
    const taskIndex = draft.tasks.findIndex((task) => task.id === id);

    draft.tasks.splice(taskIndex, 1);
  });

export const tasksReducer = (
  todoList: TodoList,
  action: ActionProps,
): TodoList => {
  switch (action.type) {
    case Action.ADD_TASK:
      return addTask(todoList, action.title);

    case Action.TOGGLE_TASK:
      return toggleTask(todoList, action.id);

    case Action.DELETE_TASK:
      return deleteTask(todoList, action.id);

    default:
      return todoList;
  }
};

const addTodo = (todos: Todos, title: string) =>
  produce(todos, (draft) => {
    draft.todos.push({
      title,
      id: draft.nextId++,
      tasks: [],
      nextId: 1,
    });
  });

const deleteTodo = (todos: Todos, id: number) =>
  produce(todos, (draft) => {
    const taskIndex = draft.todos.findIndex((todo) => todo.id === id);

    draft.todos.splice(taskIndex, 1);
  });

export const todoReducer = (
  todos: Todos,
  action: ActionProps,
): Todos => {
  switch (action.type) {
    case Action.ADD_TODO:
      return addTodo(todos, action.title);

    case Action.DELETE_TODO:
      return deleteTodo(todos, action.id);

    default:
      return todos;
  }
};
