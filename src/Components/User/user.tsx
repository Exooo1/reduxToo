import {actionUserSlice} from '../Store/Store';
import {useActions, useAppDispatch, useAppSelector} from '../Store/redux-utils'
import {selectSuper, selectUser} from '../Selectors/SelectorsRedux';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {countCake} from '../Store/CakeReducer';
import {att, incCountt} from "../Store/Actions";
import {actionGetUser, addUsersFetch, LoadActions} from "../Store/UsersReducer";
import {useDispatch} from "react-redux";

export const User = () => {
    console.log('user')
    const {fetchAddUser, fetchDeleteUsers, fetchGetUsers} = useActions(actionUserSlice)
    const [name, setName] = useState<string>('')
    const users = useAppSelector(selectSuper)
    // const cake = useAppSelector(state => state.cakeReducer.cakeCount)
    // const load = useAppSelector(state => state.usersReducer.load)
    // const count = useAppSelector(state => state.usersReducer.count)
    const disp = useDispatch()
    // const dispatch = useAppDispatch()
    const handlerName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const handlerAddUser = () => {
        // fetchAddUser({id:users.length+1,name,surname:"Maskal"})
        disp({type: "ACTION-GET-USER", id: users.length + 1, name, surname: 'Maskaelcnhik'})
        setName('')
    }
    const handlerDeleteUser = (id: number) => fetchDeleteUsers(id)
    useEffect(() => {
        // fetchGetUsers()
        disp(actionGetUser())

    }, [])


    // @ts-ignore
    return <div>
        {/*{load ? <h1>omg</h1> : null}*/}
        {/*<button style={{color: "red"}} onClick={() => dispatch(LoadActions())}>cchangeLoad</button>*/}
        {/*<button onClick={() => disp({type: "ACTION-UK"})}>{count}</button>*/}
        {/*<button onClick={() => dispatch(incCount(count + 1))}>{count}</button>*/}
        {/*<h1 onClick={() => dispatch(countCake())}>THIS IS USER!Cake{cake}</h1>*/}
        <input type="text" value={name} onChange={handlerName}/>
        <button onClick={handlerAddUser}>add</button>
        {users?.map(item => <h4 key={item.id}
                                onClick={() => handlerDeleteUser(item.id)}>{item.name} {item.surname}</h4>)}
    </div>
}