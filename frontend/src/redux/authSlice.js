import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            localStorage.clear()
            state.user = action.payload.others
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        register(state, action) {
            localStorage.clear()
            state.user = action.payload.others
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        logout(state) {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.clear()
        },
        loginWithGoogle(state, action) {
            localStorage.clear();
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        updateName(state, action) {
            state.user.name = action.payload.user.name
            state.user.profileImg = action.payload.user.profileImg
            state.token = action.payload.token
        }
    },
})

export const { login, register, logout, updateName, loginWithGoogle } = authSlice.actions

export default authSlice.reducer