import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../modules/authSlice';
import reviewSlice from '../modules/reviewSlice';
import mapSlice from '../modules/mapSlice';
import bookingSlice from '../modules/bookingSlice';
const store = configureStore({
  reducer: {
    authSlice,
    reviewSlice,
    mapSlice,
    bookingSlice,
  },
});

export default store;
