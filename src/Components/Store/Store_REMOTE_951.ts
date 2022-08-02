import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk'
import {addUsersFetch, addUsersq, asyncActions, getUserss, loadDs, slice, usersReducer} from './UsersReducer';
import {cakeReducer} from './CakeReducer';
import {countReducer} from './countReducer';
import createSagaMiddleware from 'redux-saga'
import {takeEvery,race} from 'redux-saga/effects'

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

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware, sagaMiddle)
})


function* rootWatcher() {
    yield takeEvery("ACTION-UK", addUsersFetch)
    // yield takeEvery("ACTION-GET-USERS", getUserss)
    // yield takeEvery("ACTION-GET-LOAD", loadDs)
    // yield takeEvery("ACTION-GET-USER", addUsersq)
}

function* incWatcher(){
    yield takeEvery("ACTION-GET-USERS", getUserss)
    yield takeEvery("ACTION-GET-LOAD", loadDs)
    yield takeEvery("ACTION-GET-USER", addUsersq)
}
function* simpleWatcher(){
    yield race([rootWatcher(),incWatcher()])
}


sagaMiddle.run(simpleWatcher)

