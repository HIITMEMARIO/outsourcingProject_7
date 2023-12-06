import { createSlice } from '@reduxjs/toolkit';

const initialState = true;
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state = true;
    },
  },
});
export default authSlice.reducer;
export const { login } = authSlice.actions;
