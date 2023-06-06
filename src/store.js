import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/addNewPost';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});

export default store;
