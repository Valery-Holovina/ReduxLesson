import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
const API_URL = 'https://jsonplaceholder.typicode.com/todos';
async function parseResponse(response, rejectWithValue) {
  if (!response.ok) {
    return rejectWithValue(
      `HTTP ${response.status}: запит не виконано`
    );
  }
  return response.json();
}
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}?_limit=10`);
      return await parseResponse(response, rejectWithValue);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (title, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          completed: false,
          userId: 1
        })
      });
      return await parseResponse(response, rejectWithValue);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task, { rejectWithValue }) => {
    try {
      const updates = {
        completed: !task.completed
      };
      const response = await fetch(`${API_URL}/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      const data = await parseResponse(response, rejectWithValue);
      return {
        ...task,
        ...data,
        ...updates
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        return rejectWithValue(
          `HTTP ${response.status}: завдання не видалено`
        );
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  items: [],
  status: 'idle',
  mutationStatus: 'idle',
  error: null
};
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      })
      .addCase(createTask.pending, state => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.mutationStatus = 'idle';
        state.items.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.mutationStatus = 'idle';
        state.error = action.payload ?? action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          task => task.id !== action.payload
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message;
      });
  }
});
export default tasksSlice.reducer;
 