import React, { useState, useReducer } from "react";
import Form from "./components/Form";
import "./App.css";
import TaskList from "./components/TaskList";
import Counter from "./components/Counter";
import TaskContext from "./contexts/TaskContext";
import TaskReducer from "./reducers/Tasks";

export default function App() {
  // const [tasks, setTasks] = useState([
  //   { title: "react", completed: false },
  //   { title: "redux", completed: true },
  // ]);
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  const [state, dispatch] = useReducer(TaskReducer, {
    tasks: tasks || [],
  });

  return (
    <TaskContext.Provider
      value={{
        filter: state.filter,
        tasks: state.tasks,
        dispatchTask: dispatch,
      }}
    >
      <div className="todo-list">
        <Form />
        <TaskList />
        <Counter />
      </div>
    </TaskContext.Provider>
  );
}
