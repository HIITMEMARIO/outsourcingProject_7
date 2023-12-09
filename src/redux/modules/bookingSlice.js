import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookingAxios from 'api/booking';
import axios from 'axios';

const initialState = {
  review: [],
  isLoading: false,
  isError: false,
  error: null,
};
// Add
export const __addBooking = createAsyncThunk(
  'addBooking',
  async (payload, thunkAPI) => {
    try {
      const res = await bookingAxios.post('/booking', payload);
      console.log('addReviews -> res', res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// GET
export const __getBooking = createAsyncThunk(
  'getBooking',
  async (payload, thunkAPI) => {
    try {
      const res = await bookingAxios.get('/booking');
      console.log('getReviews', res.data);
      // return thunkAPI.fulfillWithValue(res.data);
      return res.data;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// DELETE
export const __deleteBooking = createAsyncThunk(
  'deleteBooking',
  async (payload, thunkAPI) => {
    try {
      const res = await bookingAxios.delete(`/booking/${payload}`);

      // console.log('삭제', res.data);
      return res.data;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// EDIT
export const __editBooking = createAsyncThunk(
  'editBooking',
  async (payload, thunkAPI) => {
    try {
      const res = await bookingAxios.patch(`/booking/${payload.id}`, {
        comment: payload.newComment,
      });

      console.log('res', res.data);
      return res.data;
    } catch (error) {
      // console.log('error', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Slice
export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__getBooking.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        // state. = action.payload;
      })
      .addCase(__getBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.review = action.payload;
      })
      .addCase(__addBooking.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__addBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        // state.review.push(action.payload);
      })
      .addCase(__addBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(__deleteBooking.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        // state.review = state.review.filter(
        //   (data) => data.id === action.payload,
        // );
      })
      .addCase(__deleteBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(__editBooking.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__editBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log('qqq');
        // state.review = state.review.map((item) => {
        //   if (item.id === action.payload.id) {
        //     return { ...item, comment: action.payload.comment };
        //   }
        //   return item;
        // });
      })
      .addCase(__editBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});
export const {} = bookingSlice.actions;
export default bookingSlice.reducer;
