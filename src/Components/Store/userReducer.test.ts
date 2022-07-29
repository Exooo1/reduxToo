import {addUsersFetch, getUserReq, getUserss, incCount, slice} from './UsersReducer'
import {call, put} from "redux-saga/effects";
import {api} from "../API/Api";
import {store} from "./Store";


const initialState = {
    users: [],
    load: false,
    count: 0
}

it('checkInitial', () => {
    const reducer = slice.reducer
    const endState = reducer(initialState, incCount(+1))
    expect(endState.count).toBe(1)
})
it('checksInitial', () => {
    const a = {id: 2, name: 2, surname: ""}
    const reducer = slice.reducer
    const endState = reducer(initialState, getUserReq({data: [a], load: true}))
    expect(endState.users.length).toBe(1)
})
it('tests redux-toolkit', () => {
    const gen = addUsersFetch()
    expect(gen.next().value).toEqual(put(incCount(1)))
})
it('testGetUsers', () => {
    const loads = true
    const gen = getUserss({type: "", load: loads})
    expect(gen.next().value).toEqual(call(api.getUser))
    const initail = {
        data: [
            {
                "id": 1,
                "name": "asdasd",
                "surname": "Maskalenchik"
            },
            {
                "id": 2,
                "name": "adasd",
                "surname": "Maskalenchik"
            },
        ]
    }
    expect(gen.next(initail).value).toEqual(put(getUserReq({data: initail.data, load: true})))
})
// import {fetchAddUser, fetchDeleteUsers, usersReducer} from './UsersReducer';

// test('testReducer', () => {
// const action = fetchAddUser.fulfilled({id: 1, name: '', surname: ''}, '', {id: 1, name: '', surname: ''})
// const reducer = usersReducer({users: []}, action)
// expect(reducer.users.length).toBe(1)
// })
//
// test('reducer', () => {
//     const action: any = 'any'
//     const reducer = usersReducer(initialState, action)
//     expect(reducer.users).toEqual([])
// })
//
// test('testReducer', () => {
//     const action = fetchDeleteUsers.fulfilled(2, '', 2)
//     const reducer = usersReducer({users: [{id: 2, name: '', surname: ''}]}, action)
//     expect(reducer.users.length).toBe(0)
// })
// test('throw test',()=>{
//     console.log("all ok")
// })

