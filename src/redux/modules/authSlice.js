import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "shared/firebase";
const initialState = {
    isLogin: !!localStorage.getItem("accessToken"),
    loginUser: "",
    isLoading: false,
    isError: false,
    error: null,
}

export const __loginUser = createAsyncThunk("getLoginUser", async (payload, thunkApi) => {
    try {

        const auth = getAuth();
        const { email, password } = payload
        console.log(auth.currentUser)
        await signInWithEmailAndPassword(auth, email, password)
        if (!!auth.currentUser) {
            const { accessToken, displayName } = auth.currentUser
            return { accessToken, displayName }
        }
        throw new Error('에러')

    } catch (error) {
        const errorCode = error.code;
        console.log('에러코드', errorCode);
        const errorMessage = error.message;
        console.log('에러메세지', errorMessage);
    }
})
export const __signupUser = createAsyncThunk("getSignupUser", async (payload, thunkApi) => {
    try {
        const auth = getAuth();
        console.log(payload)
        const { email, password, nickname } = payload
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, {
            displayName: nickname,
        });
        if (!!auth.currentUser) {
            const { accessToken, displayName } = auth.currentUser
            return { accessToken, displayName }
        }
        throw new Error('에러')


    } catch (error) {
        const errorCode = error.code;
        console.log('에러코드', errorCode);
        const errorMessage = error.message;
        console.log('에러메세지', errorMessage);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.isLogin = false;
            signOut(auth)
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
export const { logout } = authSlice.actions
