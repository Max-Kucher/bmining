import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from "@/slices/userSlice";
import {exchangeRateReducer} from "@/slices/currencyRateSlice";

export const loadState = stateName => {
    try {
        const serializedState = localStorage.getItem(stateName);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state, stateName) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(stateName, serializedState);
    } catch (err) {
        throw new Error("Can't save changes in local storage");
    }
};

export const store = configureStore({
    reducer: {
        user: userReducer,
        exchangeRate: exchangeRateReducer,
    },
    preloadedState: loadState('main'),
});

store.subscribe(() => {
    saveState({
        user: store.getState().user,
        exchangeRate: store.getState().exchangeRate
    }, 'main');
});
