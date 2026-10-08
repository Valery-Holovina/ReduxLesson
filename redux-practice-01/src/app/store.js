import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import tasksReducer from '../features/tasks/tasksSlice';
 
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    tasks: tasksReducer
  }
});
 
 