import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookingAxios from 'api/booking';
import axios from 'axios';

const initialState = {
  booking: [],
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
      const resData = res.data.filter((item) => {
        const changeDateform = new Date(item.date);
        const nowDate = new Date(Date.now());
        return changeDateform.getTime() > nowDate.getTime();
      });
      return resData;
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
      await bookingAxios.delete(`/booking/${payload}`);

      return thunkAPI.fulfillWithValue(payload);
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
        date: payload.newDate,
      });
      console.log('이거 좀 ', res.data);
      return res.data;
    } catch (error) {
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
        state.booking = action.payload;
      })
      .addCase(__getBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.booking = action.payload;
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
      .addCase(__deleteBooking.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.booking = state.booking.filter((data) => {
          return data.id !== action.payload;
        });
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
        state.booking = state.booking.map((item) => {
          // console.log('item', item.id);
          if (item.id === action.payload.id) {
            console.log('dfsfsdfafrfdsfref', action.payload.id);
            console.log('sdfdd', item.id);
            return { ...item, date: action.payload.date };
          }
          return item;
        });
      })
      .addCase(__editBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});
export const { } = bookingSlice.actions;
export default bookingSlice.reducer;
