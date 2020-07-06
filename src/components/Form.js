import React, {
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import TaskContext from "./../contexts/TaskContext";

const Form = () => {
  const { dispatchTask } = useContext(TaskContext);
  const inputTitle = useRef("");
  const formRef = useRef(null);
  const inputSearch = useRef("");

  const handleAddTask = (e) => {
    e.preventDefault();

    dispatchTask({
      type: "ADD_TASK",
      title: inputTitle.current.value,
      completed: false,
    });
    formRef.current.reset();
  };

  useEffect(
    (e) => {
      handleSearch(e);
    },
    [inputSearch.current.value]
  );

  const handleSearch = (e) => {
    // e.preventDefault();

    dispatchTask({
      type: "SEARCH_TASK",
      query: inputSearch.current.value,
    });
    // formRef.current.reset();
  };

  useEffect(() => {
    inputTitle.current.focus();
  }, []);

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        if (inputTitle.current.focus) {
          handleAddTask(e);
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <form className="todo" autoComplete="off" ref={formRef}>
      <input
        type="text"
        name="item"
        ref={inputSearch}
        onChange={handleSearch}
      />
      <button onClick={handleSearch}>search</button>

      <input
        type="text"
        name="item"
        id="item"
        ref={inputTitle}
      />
      <button type="submit" onClick={handleAddTask}>
        + Add To Your List
      </button>
    </form>
  );
};

export default Form;
