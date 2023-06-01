import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (newPost, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/post/create', newPost);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: { posts: [], error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addNewPost.pending, (state) => {
            state.error = null;
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        })
        .addCase(addNewPost.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});




  export default postsSlice.reducer;