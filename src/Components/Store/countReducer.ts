import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    count: 0
}

export const slice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        addCount(state) {
            state.count++
        }
    },
})
export const countReducer = slice.reducer
export const {addCount} = slice.actions
