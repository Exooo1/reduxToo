import {AppRootState} from '../Store/redux-utils';

export const selectUser = (state: AppRootState) => state.usersReducer.users;