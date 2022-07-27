import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from "../API/Api";
import {AxiosError, AxiosResponse} from "axios";
import {AppRootState} from "./redux-utils";
import {att, incCountt} from "./Actions";
import {put, call} from 'redux-saga/effects'

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
    yield  put(incCount(+1))
}

export function* getUserss(action: ReturnType<typeof actionGetUser>) {
    const {data} = yield call(api.getUser)
    console.log(data)
    yield put(getUserReq({data: data, load: action.load}))
}

export const actionGetUser = () => ({type: "ACTION-GET-USERS", load: true})

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
        if (id === 0) throw new AxiosError('dont work')
        await api.addUser({id, name, surname})
        const time = getState() as AppRootState
        return {id, name, surname}
    } catch (err) {
        const error = err as AxiosError
        console.log(error.response)
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
        incCount(state, action: PayloadAction<number>) {
            console.log('inc')
            state.count += action.payload
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

const {getUserReq, incCount} = slice.actions
export const usersReducer = slice.reducer


