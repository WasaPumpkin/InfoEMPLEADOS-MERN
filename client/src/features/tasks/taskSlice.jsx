//features/tasks/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://infoempleados-3q11.onrender.com/api/tasks'; // Production backend API URL



// Retrieve the initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Define the fetchTasks async thunk
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: { Authorization: `Bearer ${auth.userInfo?.token}` },
      };
      const response = await axios.get(API_URL, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Define the createTask async thunk
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ text, assignedTo }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: { Authorization: `Bearer ${auth.userInfo?.token}` },
      };
      const response = await axios.post(API_URL, { text, assignedTo }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Define the deleteTask async thunk
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: { Authorization: `Bearer ${auth.userInfo?.token}` },
      };
      await axios.delete(`${API_URL}/${taskId}`, config);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Define the completeTask async thunk
export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async ({ taskId, completionMessage }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: { Authorization: `Bearer ${auth.userInfo?.token}` },
      };
      const response = await axios.put(
        `${API_URL}/${taskId}/complete`,
        { completionMessage },
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Complete task
      .addCase(completeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
