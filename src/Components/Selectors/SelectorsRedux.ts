import {AppRootState} from '../Store/redux-utils';
import {createSelector} from "@reduxjs/toolkit";

export const selectUser = (state: AppRootState) => {
    return state.usersReducer.users
};

export const selectSuper = createSelector(selectUser, (users) => {
    console.log('Hello')
    return users
})