import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
<<<<<<< HEAD
=======
    profileImg: null
>>>>>>> parent of edb67ca4 (added google sign in)
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            localStorage.clear()
            state.user = action.payload.others
            state.token = action.payload.token
            state.profileImg = action.payload.profileImg
        },
        register(state, action) {
            localStorage.clear()
            state.user = action.payload.others
            state.token = action.payload.token
            state.profileImg = action.payload.profileImg
        },
        logout(state) {
            state.user = null
            state.token = null
            localStorage.clear()
        },
        loginWithGoogle(state, action) {
            localStorage.clear();
            state.user = action.payload.others
            state.token = action.payload.token
            state.profileImg = action.payload.profileImg
        },
        updateName(state, action) {
        state.user.name = action.payload.others.name
        }
    },
})

export const { login, register, logout, updateName, loginWithGoogle } = authSlice.actions

export default authSlice.reducer