import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import TaskContext from "./../contexts/TaskContext";

const Counter = () => {
  const { tasks, dispatchTask } = useContext(TaskContext);
  const [availables, setAvailables] = useState(0);
  const showCompletedCheckboxRef = useRef();

  const handleSortCompleted = useCallback(() => {
    showCompletedCheckboxRef.current.checked === true
      ? dispatchTask({ type: "SHOW_COMPLETED" })
      : dispatchTask({ type: "SHOW_ALL" });
  }, [showCompletedCheckboxRef]);

  useEffect(() => {
    if (tasks) {
      const availableTasks = tasks.filter(
        (task) => task.completed === false
      );
      setAvailables(availableTasks.length);
    }
  });
  return (
    <div className="todo-item counter">
      <span className="availables">{availables}</span>
      <span>
        {availables === 1 ? "Item Left" : "Items Left"}
      </span>
      <ul>
        <li className="todo-item">
          <input
            type="checkbox"
            ref={showCompletedCheckboxRef}
            onChange={handleSortCompleted}
          />
          <span className="itemName">Completed Tasks</span>
        </li>
        <li className="todo-item">
          <input type="checkbox" />
          <span className="itemName">
            UnCompleted Tasks
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Counter;
