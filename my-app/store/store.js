import { configureStore } from '@reduxjs/toolkit';
import postsSlice from '../slice/postsSlice';
import detailsSlice from '../slice/detailsSlice';

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    details: detailsSlice.reducer,
  },
});
