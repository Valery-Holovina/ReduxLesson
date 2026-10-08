import { createSlice, nanoid } from '@reduxjs/toolkit';
const initialState = {
  items: []
};
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false
          }
        };
      }
    },
    todoRemoved(state, action) {
      state.items = state.items.filter(
        todo => todo.id !== action.payload
      );
    },
    todoToggled(state, action) {
      const todo = state.items.find(
        item => item.id === action.payload
      );
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});
export const {
  todoAdded,
  todoRemoved,
  todoToggled
} = todosSlice.actions;
export default todosSlice.reducer;
 