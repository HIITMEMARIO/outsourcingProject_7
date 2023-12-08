import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
};

//Slice
export const mapSlice = createSlice({
  name: 'mapData',
  initialState,
  reducers: {
    data: (state, action) => {
      console.log(state);
      console.log('action.payload', action.payload);
      state.data = action.payload;
    },
  },
});

export default mapSlice.reducer;
export const { data } = mapSlice.actions;
