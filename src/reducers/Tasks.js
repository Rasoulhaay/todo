import { uuid } from 'uuidv4';

const TaskReducer = (state, action) => {
  let newTasks = [];

  switch (action.type) {
    case "ADD_TASK":
      newTasks = [
        ...state.tasks,
        {
          id: uuid(),
          title: action.title,
          // id: action.id,
          completed: action.completed,
        },
      ];

      if (action.title.length > 0) {
        localStorage.setItem(
          "tasks",
          JSON.stringify(newTasks)
        );

        return { ...state, tasks: newTasks };
      }
    case "REMOVE_TASK":
      newTasks = state.tasks;
      const afterRemove =
        newTasks &&
        newTasks.filter((task) => {
          return task.title !== action.title;
        });
      localStorage.setItem(
        "tasks",
        JSON.stringify(newTasks)
      );

      return {
        ...state,
        tasks: afterRemove,
      };

    case "COMPLETE_TASK":
      newTasks = state.tasks;
      let findCompletedIndex = newTasks.findIndex(
        (task) => task.id === action.id
      );
      newTasks[findCompletedIndex].completed = !state.tasks[
        findCompletedIndex
      ].completed;
      localStorage.setItem(
        "tasks",
        JSON.stringify(newTasks)
      );
      return {
        ...state,
        tasks: newTasks,
      };

    case "SEARCH_TASK":
      newTasks = state.tasks;
      let findRelatedTasks =
        newTasks &&
        newTasks.filter((task) =>
          task.title.includes(action.query)
        );
      // If User Erase Search query
      if (action.query.length > 0) {
        return {
          ...state,
          tasks: findRelatedTasks,
        };
      } else {
        return {
          ...state,
          tasks: newTasks,
        };
      }
    case "SHOW_COMPLETED":
      return {
        ...state,
        filter: 'completed'
      };
    // case "SHOW_UNCOMPLETED":

    case "SHOW_ALL":
      return {
        ...state,
        filter: 'all'
      };
    default:
  }
};

export default TaskReducer;
