import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/addNewPost';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
