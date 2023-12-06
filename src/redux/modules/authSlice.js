import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    isLogin: false,
    userData: {},
    isLoading: false,
    isError: false,
    error: null,
}
export const __login = createAsyncThunk("getUsers", async (payload, thunkApi) => {
    try {
        const { data } = await axios.get('http://localhost:5000/user')
        const { id, password } = payload
        const filteredData = await data.find(item => item.id === id && item.password === password);
        console.log(filteredData)
        if (!filteredData) {
            throw new Error("일치하는 사용자가 없습니다.");
        }
        return filteredData
    } catch (error) {
        console.error("사용자 로그인 오류", error)
        return thunkApi.rejectWithValue(error)
        // throw error
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(__login.fulfilled, (state, action) => {
            const { id, password } = action.payload
            state.isLogin = true;
            state.userData = action.payload;
            localStorage.setItem("userId", id)
            localStorage.setItem("password", password)

        });
        builder.addCase(__login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.payload
        });
    },
})
export default authSlice.reducer
export const { login } = authSlice.actions