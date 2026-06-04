import { useEffect, useReducer, useState } from "react";
import type { Dispatch, Task, TodoList, Todos } from "./tasksReducer";
import { Action, tasksReducer, todoReducer } from "./tasksReducer";

const TaskInput = ({ dispatch }: { dispatch: Dispatch }) => {
  const [title, setTitle] = useState<string>("");

  return (
    <input
      type="text"
      placeholder="Add new item"
      onKeyUp={(e) => {
        if (e.key === "Enter" && e.currentTarget.value !== "") {
          dispatch({ type: Action.ADD_TASK, title });
          e.currentTarget.value = "";
          return;
        }
        setTitle(e.currentTarget.value);
      }}
    />
  );
};

const TodoInput = ({ dispatch }: { dispatch: Dispatch }) => {
  const [title, setTodoTitle] = useState("");

  return (
    <input
      type="text"
      placeholder="Add new list"
      onKeyUp={(e) => {
        if (e.key === "Enter" && e.currentTarget.value !== "") {
          dispatch({ type: Action.ADD_TODO, title });
          e.currentTarget.value = "";
          return;
        }
        setTodoTitle(e.currentTarget.value);
      }}
    />
  );
};

const Task = ({ task, dispatch }: { task: Task; dispatch: Dispatch }) => {
  const { id, isDone, title } = task;
  return (
    <>
      <input
        type="checkbox"
        name="task"
        id={"" + id}
        defaultChecked={isDone}
        onClick={() => dispatch({ type: Action.TOGGLE_TASK, id })}
      />
      <label htmlFor={"" + id}>{title}</label>
      <button
        onClick={() => {
          dispatch({ type: Action.DELETE_TASK, id });
        }}
      >
        delete
      </button>
    </>
  );
};

const TodoList = (
  { todoList: initialTodoList, todoDispatch }: {
    todoList: TodoList;
    todoDispatch: Dispatch;
  },
) => {
  const [todoList, dispatch] = useReducer(tasksReducer, initialTodoList);
  return (
    <>
      <h2>{todoList.title}</h2>
      <button
        onClick={() =>
          todoDispatch({ type: Action.DELETE_TODO, id: todoList.id })}
      >
        delete
      </button>
      <TaskInput dispatch={dispatch} />
      {todoList.tasks.map((task) => (
        <div key={task.id}>
          <Task task={task} dispatch={dispatch} />
        </div>
      ))}
    </>
  );
};


function App() {
  const [initialTodos, setInitialTodos] = useState({ nextId: 1, todos: [] });
  useEffect(() => {
    fetch("./src/todos.json").then((x) => x.json()).then((todos) => {
      console.log(todos);
      setInitialTodos(todos);
    });

    return () => {}
  }, []);
  const [todoStore, dispatch] = useReducer(todoReducer, initialTodos);
  console.log({initialTodos});
  

  return (
    <div className="todo-list">
      <TodoInput dispatch={dispatch} />
      {todoStore.todos.map((todo) => (
        <div key={todo.id}>
          <TodoList todoList={todo} todoDispatch={dispatch} />
        </div>
      ))}
    </div>
  );
}

export default App;
