import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk'
import {addUsersFetch, asyncActions, getUserss, slice, usersReducer} from './UsersReducer';
import {cakeReducer} from './CakeReducer';
import {countReducer} from './countReducer';
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'

export const actionUserSlice = {
    ...asyncActions,
    ...slice.actions
}

const rootReducer = combineReducers({
    usersReducer,
    cakeReducer,
    countReducer
})

const sagaMiddle = createSagaMiddleware()
console.log(typeof sagaMiddle)

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware, sagaMiddle)
})


function* rootWatcher() {
    yield takeEvery("ACTION-UK", addUsersFetch)
    yield takeEvery("ACTION-GET-USERS", getUserss)
}



sagaMiddle.run(rootWatcher)

