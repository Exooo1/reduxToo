import {createSlice} from '@reduxjs/toolkit';
import {asyncActions} from './UsersReducer';

const initialState = {
    cakeCount: 0
}
export const slice = createSlice({
    name: 'cake',
    initialState: initialState,
    reducers: {
        countCake(state) {
            state.cakeCount++
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncActions.fetchAddUser.fulfilled, (state) => {
            state.cakeCount++
        })
        builder.addCase('count/addCount', (state, action) => {
            state.cakeCount++
        })
    }

})

export const cakeReducer = slice.reducer
export const {countCake} = slice.actions