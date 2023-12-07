import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
const initialState = {
    isLogin: !!localStorage.getItem("accessToken"),
    loginUser: "",
    isLoading: false,
    isError: false,
    error: null,
}


//thunk?
//thunk에서 로그인 로직 실행=>데이터를 전역으로 관리?
//로그인시 유저정보를 가져온다.
//fullpill
//isLogin값 갱신
//
export const __loginUser = createAsyncThunk("getLoginUser", async (payload, thunkApi) => {
    try {

        const auth = getAuth();
        const { email, password } = payload
        await signInWithEmailAndPassword(auth, email, password)
        const { accessToken, displayName } = auth.currentUser
        return { accessToken, displayName }
    } catch (error) {
        const errorCode = error.code;
        console.log('에러코드', errorCode);
        const errorMessage = error.message;
        console.log('에러메세지', errorMessage);
    }
})
export const __signupUser = createAsyncThunk("getSginupUser", async (payload, thunkApi) => {
    try {
        const auth = getAuth();
        const { email, password, nickname } = payload
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, {
            displayName: nickname,
        });
        const { accessToken, displayName } = auth.currentUser
        return { accessToken, displayName }

    } catch (error) {
        const errorCode = error.code;
        console.log('에러코드', errorCode);
        const errorMessage = error.message;
        console.log('에러메세지', errorMessage);
    }
})
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
        logout: (state, action) => {
            state.isLogin = false;
            localStorage.clear()
        }

    },
    extraReducers: (builder) => {
        builder.addCase(__loginUser.pending, (state, action) => {
            state.isLoading = true;

        })
        builder.addCase(__loginUser.fulfilled, (state, action) => {
            const { accessToken, displayName } = action.payload
            state.isLoading = false;
            state.isLogin = true;
            state.loginUser = displayName
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("displayName", displayName)
        })
        builder.addCase(__loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
        builder.addCase(__signupUser.pending, (state, action) => {
            state.isLoading = true;

        })
        builder.addCase(__signupUser.fulfilled, (state, action) => {
            const { accessToken, displayName } = action.payload
            state.isLoading = false;
            state.isLogin = true;
            state.loginUser = displayName
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("displayName", displayName)
        })
        builder.addCase(__signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }

})
export default authSlice.reducer
export const { login, logout } = authSlice.actions



// extraReducers: (builder) => {
//     builder.addCase(__login.pending, (state, action) => {
//         state.isLoading = true;
//         state.isLogin = true;

//     });
//     builder.addCase(__login.fulfilled, (state, action) => {
//         const { id, password } = action.payload
//         state.isLogin = true;
//         state.userData = action.payload;
//         localStorage.setItem("userId", id)
//         localStorage.setItem("password", password)

//     });
//     builder.addCase(__login.rejected, (state, action) => {
//         state.isLoading = false
//         state.isError = true
//         state.error = action.payload
//     });
// },