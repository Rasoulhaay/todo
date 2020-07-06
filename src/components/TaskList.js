import React, { useContext } from "react";
import TaskContext from "./../contexts/TaskContext";
const TaskList = () => {
  const { tasks, dispatchTask } = useContext(TaskContext);

  const handleRemoveTask = (index) => {
    dispatchTask({
      type: "REMOVE_TASK",
      title: tasks[index].title,
    });
  };

  const handleCompleteTask = (index) => {
    dispatchTask({
      type: "COMPLETE_TASK",
      title: tasks[index].title,
    });
  };

  return (
    <ul className="list">
      {tasks &&
        tasks.map((task, index) => (
          <li className="todo-item" key={index}>
            <input
              type="checkbox"
              defaultChecked={task.completed ? true : false}
              onChange={() => handleCompleteTask(index)}
            />
            <span className="itemName">{task.title}</span>
            <button onClick={() => handleRemoveTask(index)}>
              ×
            </button>
          </li>
        ))}
    </ul>
  );
};

export default TaskList;
