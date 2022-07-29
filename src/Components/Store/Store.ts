import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk'
import {addUsersFetch, addUsersq, asyncActions, getUserss, loadDs, slice, usersReducer} from './UsersReducer';
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
    yield takeEvery("ACTION-GET-LOAD", loadDs)
    yield takeEvery("ACTION-GET-USER", addUsersq)
}



sagaMiddle.run(rootWatcher)

