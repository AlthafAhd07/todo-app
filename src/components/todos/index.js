import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../features/authSlice";
import { clearCompleted, selectTodo } from "../../features/todoSlice";
import "./index.css";
import TodoItem from "./TodoItem";
const Todos = ({ setUpdateTodo }) => {
  const { todos, activeTodos } = useSelector(selectTodo);
  const dispatch = useDispatch();
  const [filterByStatus, setFilterByStatus] = useState();
  const [selectAllTodo, setSelectAllTodo] = useState(true);
  const { user } = useSelector(selectAuth);
  return (
    <div>
      <div className="todos">
        {todos?.map((todo) => {
          if (todo.status === filterByStatus || selectAllTodo) {
            return (
              <TodoItem
                todo={todo}
                key={todo.id}
                setUpdateTodo={setUpdateTodo}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="options">
        <div className="option__left option__btn">{activeTodos} items left</div>
        <div className="options__selectBtnGroup">
          <div
            onClick={() => {
              setSelectAllTodo(true);
            }}
          >
            All
          </div>
          <div
            onClick={() => {
              setFilterByStatus("active");
              setSelectAllTodo(false);
            }}
          >
            Active
          </div>
          <div
            onClick={() => {
              setFilterByStatus("completed");
              setSelectAllTodo(false);
            }}
          >
            Completed
          </div>
        </div>
        <div
          className="option__right option__btn"
          onClick={() =>
            dispatch(
              clearCompleted({ id: user.uid, username: user.displayName })
            )
          }
        >
          Clear Completed
        </div>
      </div>
    </div>
  );
};

export default Todos;
