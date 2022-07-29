import React, {useState} from 'react';
import {AppStyle, ButtonTest} from './Components/Style/AppStyle';
import {Provider} from 'react-redux';
import {store} from './Components/Store/Store';
import {User} from "./Components/User/user";

const file = (e: any) => {
    console.log('222')
    const inforFile = new FileReader()

    inforFile.onload = async (e) => {
        // @ts-ignore
        console.log(e.target)
    }
    inforFile.readAsDataURL(e.target.files[0])
    console.log(e.target.files[0].size)
}

export const App = () => {
    const [line, setLine] = useState("0")

    return <Provider store={store}>
        <AppStyle back={'grey'} width={'50%'} height={'100vh'}>
            <User/>
            {/*<ButtonTest>Click</ButtonTest>*/}
            {/*<input type="range" value={line} onChange={(e) => setLine(e.target.value)}/>*/}
            {/*<svg>*/}
            {/*    <line x1="0" y1={line} x2="0" y2="500" stroke="rgb(1,2,2)"/>*/}
            {/*    <line x1="10" y1="0" x2="10" y2="500" stroke="rgb(1,2,2)"/>*/}
            {/*    <line x1="20" y1="0" x2="20" y2="500" stroke="rgb(1,2,2)"/>*/}
            {/*    <line x1="30" y1="0" x2="30" y2="500" stroke="rgb(0,0,0)"/>*/}
            {/*</svg>*/}
        </AppStyle>
    </Provider>
}

const a = ()=>{
    throw new
    Error
    ('subj')
}
const b = a()

