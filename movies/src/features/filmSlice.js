import { createSlice } from '@reduxjs/toolkit';

export const filmSlice = createSlice({
    name: 'film',
    initialState: {
        value: 'no one',
        timestamp: 0
    },
    reducers: {
        setTimestamp: (state, action) => {
            state.timestamp = action.payload;
        }
    }
});

export const { setTimestamp } = filmSlice.actions;

export default filmSlice.reducer;
