import {createSlice} from '@reduxjs/toolkit'

const initialRate = {
    btc: {
        value: 0,
    },
};

const exchangeRateSlice = createSlice({
    name: 'exchangeRate', initialState: initialRate, reducers: {
        updateBtc(state, action) {
            return {
                ...state,
                btc: {
                    value: action.payload,
                }
            };
        },
        resetRates(state, action) {
            return {
                ...initialRate
            };
        },
    }
})

export const {
    updateBtc,
    resetRates
} = exchangeRateSlice.actions;

export const selectBtcRate = (state) => state.exchangeRate.btc.value;

export const exchangeRateReducer = exchangeRateSlice.reducer;
