import React, { useContext } from "react";
import TaskContext from "./../contexts/TaskContext";
const TaskList = () => {
  const { filter, tasks, dispatchTask } = useContext(TaskContext);
  let filteredTasks = tasks
  const handleRemoveTask = (index) => {
    dispatchTask({
      type: "REMOVE_TASK",
      title: tasks[index].title,
    });
  };

  const handleCompleteTask = (index) => {
    console.log('handleCompleteTask',tasks)
    dispatchTask({
      type: "COMPLETE_TASK",
      id: tasks[index].id,
    });
  };

  if (filter && filter === 'completed') {
    filteredTasks = tasks.filter(item => item.completed)
  }
  
  return (
    <ul className="list">
      {filteredTasks &&
        filteredTasks.map((task, index) => (
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
