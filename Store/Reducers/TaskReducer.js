import {
    CREATE_TASK,
   SET_TASK
  } from '../Actions/TaskActions';
  import Tasks from '../../models/Tasks';

  const initialState = {
    userTasks: []
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_TASK: 
      return {
       userTasks: action.userTask
      }
      case CREATE_TASK:
        const newProduct = new Tasks(
          action.productData.title,
        );
        return {
          ...state,
          userTasks: state.userTasks.concat(newProduct)
        };
    }
    return state;
  };
  