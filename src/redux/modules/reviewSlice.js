import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  review: [],
  isLoading: false,
  isError: false,
  error: null,
};
// Add
export const __addReview = createAsyncThunk(
  'addReviews',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/review`,
        payload,
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// GET
export const __getReview = createAsyncThunk(
  'getReviews',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/review`);
      return res.data;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// DELETE
export const __deleteReview = createAsyncThunk(
  'deleteReviews',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/review/${payload}`,
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// EDIT
export const __editReview = createAsyncThunk(
  'editReviews',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/review/${payload.id}`,
        { comment: payload.newComment },
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Slice
export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__getReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.review = action.payload;
      })
      .addCase(__getReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.review = action.payload;
      })
      .addCase(__addReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.review.push(action.payload);
      })
      .addCase(__addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(__deleteReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.review = state.review.filter(
          (data) => data.id !== action.payload,
        );
      })

      .addCase(__deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(__editReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__editReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.review = state.review.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, comment: action.payload.comment };
          }
          return item;
        });
      })
      .addCase(__editReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});
export const {} = reviewSlice.actions;
export default reviewSlice.reducer;
