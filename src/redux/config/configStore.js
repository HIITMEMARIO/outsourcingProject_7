import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../modules/authSlice';
import reviewSlice from '../modules/reviewSlice';
import mapSlice from '../modules/mapSlice';
const store = configureStore({
  reducer: {
    authSlice,
    reviewSlice,
    mapSlice,
  },
});

export default store;
