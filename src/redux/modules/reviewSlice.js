import {
  // asyncThunkCreator,
  // buildCreateSlice,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  review: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __addReview = createAsyncThunk(
  'addReviews',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post('http://localhost:5000/review', payload);
      console.log('addReviews -> res', res.data);
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
      const res = await axios.get('http://localhost:5000/review');
      console.log('getReviews', res.data);
      // return thunkAPI.fulfillWithValue(res.data);
      return res.data;
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Slice
export const ReviewSlice = createSlice({
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
        state.reviews = action.payload;
      })
      .addCase(__getReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.reviews = action.payload;
      })
      .addCase(__addReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.reviews.push(action.payload);
      })
      .addCase(__addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.reviews = action.payload;
      });
  },
});
// add 만드셈
export const {} = ReviewSlice.actions;
export default ReviewSlice.reducer;
