import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "shared/firebase";
const initialState = {
    isLogin: !!localStorage.getItem("accessToken"),
    loginUser: "",
    isLoading: false,
    isError: false,
    error: null,
    // canUseEmail: true,
    // canUseNickname: true
}

export const __loginUser = createAsyncThunk("getLoginUser", async (payload, thunkApi) => {
    try {

        const auth = getAuth();
        const { email, password } = payload
        // try {

        await signInWithEmailAndPassword(auth, email, password)
        if (!!auth.currentUser) {
            const { accessToken, displayName } = auth.currentUser
            return { accessToken, displayName }
        }
        // } catch (error) {
        //     throw error
        // }

    } catch (error) {
        const errorCode = error.code;
        console.log('에러코드', errorCode);
        const errorMessage = error.message;
        console.log('에러메세지', errorMessage);
        throw error

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
        const userRef = doc(db, 'userInfo', nickname)
        await setDoc(userRef, { email, nickname })
        if (!!auth.currentUser) {
            const { accessToken, displayName } = auth.currentUser
            return { accessToken, displayName }
        }


    } catch (error) {
        const errorCode = error.code;
        console.log('에러코드', errorCode);
        const errorMessage = error.message;
        console.log('에러메세지', errorMessage);
        throw error

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
        },
        // isDuplicateEmail: async (state, action) => {
        //     const emailRef = collection(db, 'userInfo')
        //     const q = query(emailRef, where('email', '==', action.payload))
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.docs.length === 0 ? state.canUseEmail = true : state.canUseEmail = false
        // },
        // isDuplicateNickname: async (state, action) => {
        //     const nicknameRef = collection(db, 'userInfo')
        //     const q = query(nicknameRef, where('nickname', '==', action.payload))
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.docs.length === 0 ? state.canUseNickname = true : state.canUseNickname = false
        // },

    },
    extraReducers: (builder) => {
        builder.addCase(__loginUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;

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
