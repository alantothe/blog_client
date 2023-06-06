import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`api/user/${userId}`);

      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { username: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder


      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.username = action.payload.username;
        state.data = action.payload;
      })

      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default userSlice.reducer;
