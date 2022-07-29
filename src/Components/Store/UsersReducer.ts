import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from "../API/Api";
import {AxiosError, AxiosResponse} from "axios";
import {AppRootState} from "./redux-utils";
import {att, incCountt} from "./Actions";
import {put, call, cancel, cancelled} from 'redux-saga/effects'

export type UserType = {
    id: number,
    name: string
    surname: string,
}
type InitialStateType = {
    users: Array<UserType>
    load: boolean
    count: number
}

export function* addUsersFetch() {
    try {
        yield  put(incCount(+1))
        throw new AxiosError('count dont work')
    } catch (err) {
        yield cancelled()
        console.log(err)
    }
}

export const actionGetUser = () => ({type: "ACTION-GET-USERS", load: true})
type ActionType = ReturnType<typeof actionGetUser>

export function* getUserss(action: ReturnType<typeof actionGetUser>) {
    try {
        const {data} = yield call(api.getUser)
        console.log(data)
        yield put(getUserReq({data: data, load: action.load}))
    } catch (err) {
        console.log(err)
    }
}

export function* addUsersq(action: any) {
    console.log('alesha')
    try {
        if (action.id === 1) throw new AxiosError('dont work')
        yield call(api.addUser, {...action})
        yield put(addUser(action))
    } catch (err) {
        console.log(err)
    }
}

export function* loadDs(action: ReturnType<typeof LoadActions>) {
    try {
        console.log('loads')
        yield put(changeLoad())
    } catch (err) {
        console.log(err)
    }
}

export const LoadActions = () => ({type: "ACTION-GET-LOAD"})


const fetchDeleteUsers = createAsyncThunk('users/fetchDeleteUsers', async (id: number) => {
    try {
        await api.deleteUser(id)
        return id
    } catch (err) {
    }
})
const fetchGetUsers = createAsyncThunk('users/fetchGetUsers', async () => {
    try {
        const {data} = await api.getUser()
        return data
    } catch (err) {
    }

})
type ThunkError = { rejectValue: { errors: string } }
const fetchAddUser = createAsyncThunk<UserType, UserType, ThunkError>('users/fetchAddUser', async ({
                                                                                                       id,
                                                                                                       name,
                                                                                                       surname
                                                                                                   }, {
                                                                                                       rejectWithValue,
                                                                                                       getState
                                                                                                   }) => {
    try {
        if (id === 1) throw new AxiosError('dont work')
        await api.addUser({id, name, surname})
        const time = getState() as AppRootState
        return {id, name, surname}
    } catch (err) {
        const error = err as AxiosError
        console.log(error)
        return rejectWithValue({errors: error.message})
    }

})
export const asyncActions = {fetchDeleteUsers, fetchGetUsers, fetchAddUser}


export const slice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        load: false,
        count: 0
    } as InitialStateType,
    reducers: {
        addUser(state, action) {
            if (action.payload) state.users.push(action.payload)
        },
        changeLoad(state) {
            state.load = !state.load
        },
        incCount(state, action: PayloadAction<number>) {
            try {
                state.count += action.payload

            } catch (err) {
                console.log('err')
            }
        },
        getUserReq(state, action: PayloadAction<{ data: Array<any>, load: boolean }>) {
            state.users = action.payload.data
            state.load = action.payload.load
        }
    },
    extraReducers: (builder => {
        builder.addCase(att, (state) => {
            state.load = !state.load
        })

            .addCase(fetchDeleteUsers.fulfilled, (state, action) => {
                // return {...state, users: state.users.filter(item => item.id !== action.payload)}
                const item = state.users.findIndex(item => item.id === action.payload)
                state.users.splice(item, 1)
            })
            // .addCase(incCountt, (state, action) => {
            //     state.count += action.payload.go
            // })
            .addCase(fetchGetUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(fetchAddUser.fulfilled, (state, action) => {
                console.log('one')
                if (action.payload) state.users.push(action.payload)
                state.load = true
            })
        builder.addCase(fetchAddUser.rejected, (state, action) => {
            console.log('two')
        })
    })
})

export const {getUserReq, incCount, changeLoad, addUser} = slice.actions
export const usersReducer = slice.reducer



