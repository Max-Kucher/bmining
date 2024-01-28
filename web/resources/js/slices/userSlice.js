import {createSlice} from '@reduxjs/toolkit'

const initalUser = {
    id: 0, name: '', surname: '', balance: 0,
};
const fullInitial = {
    emailVerified: false, tfaPassed: true, isAuth: false, user: initalUser, token: '', permissions: [],
};

const userSlice = createSlice({
    name: 'user', initialState: fullInitial, reducers: {
        login(state, action) {
            return {
                ...state,
                isAuth: true,
                user: action.payload.user,
                token: action.payload.token,
                emailVerified: action.payload.emailVerified,
                tfaPassed: action.payload.tfaPassed,
                permissions: action.payload.permissions,
            };
        },
        updateUser(state, action) {
            return {
                ...state,
                isAuth: true,
                user: action.payload.user,
                token: action.payload?.token ?? state.token,
                emailVerified: action.payload.emailVerified,
                tfaPassed: action.payload.tfaPassed,
                permissions: action.payload.permissions,
            };
        },
        updateUserProp(state, action) {
            return {
                ...state,
                user: {
                    ...action.payload.user,
                },
            };
        },

        updateAvatar(state, action) {
            return {
                ...state, user: {
                    ...state.user, avatar: action.payload.avatar,
                },
            };
        },
        updateTfa(state, action) {
            return {
                ...state, user: {
                    ...state.user, tfa_enabled: action.payload.tfa,
                },
            };
        },
        updateToken(state, action) {
            return {
                ...state, user: {
                    ...state.user, token: action.payload.token,
                },
            };
        },
        passTfa(state, action) {
            return {
                ...state,
                token: action.payload.token,
                tfaPassed: true,
            };
        },
        logout(state, action) {
            return {
                ...fullInitial
            };
        },
    }
})

export const {
    logout,
    login,
    updateUser,
    updateAvatar,
    updateToken,
    passTfa,
    updateTfa,
    updateUserProp
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserBalance = (state) => state.user.user.balance;
export const selectToken = (state) => state.user.token;
export const selectEmailVerified = (state) => state.user.emailVerified;
export const selectTfaPassed = (state) => state.user.tfaPassed;
export const selectAuth = (state) => {
    return state.user.isAuth
};
export const selectPermissions = (state) => {
    return state.user.permissions;
};
export const userReducer = userSlice.reducer;
