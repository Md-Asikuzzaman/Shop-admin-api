import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface userType {
  id: number;
  name: string;
  email: string;
}

interface initialStateType {
  loading: boolean;
  users: userType[];
  error: string;
}

const initialState: initialStateType = {
  loading: false,
  users: [],
  error: '',
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
      state.users = [];
      state.error = '';
    });

    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<userType[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = '';
      }
    );

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = true;
      state.users = [];
      state.error = action.error.message || 'Something went wrong!!!';
    });
  },
});

export default userSlice.reducer;
