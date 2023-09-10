const initialState = {
  currentUser: null,
  tasks: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'ADD_TASK':
      console.log(state.tasks)
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case 'SET_TASKS':
      // if the payload is a object with error: 429 (too many requests), change the state to 429 int value and return it
      if (action.payload.error) {
        return {
          ...state,
          tasks: action.payload.error
        }
      }
      return {
        ...state,
        tasks: action.payload.tasks.map(task => ({
          _id: task._id,
          title: task.title,
          description: task.description,
          completed: task.completed,
          user: task.user,
          __v: task.__v
        }))
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task._id === action.payload.id) {
            return {
              ...task,
              title: action.payload.title,
              description: action.payload.description,
              completed: action.payload.completed
            }
          }
          return task;
        })
      };
    default:
      return state;
  }
};

export default userReducer;
