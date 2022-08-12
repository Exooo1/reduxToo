import {useAppSelector} from "./Store/redux-utils";
import {useDispatch} from "react-redux";

export const Count = () => {
    console.log('Count')
    const disp = useDispatch()
    const count = useAppSelector(state => state.usersReducer.count)
    console.log(count)
    return <div>
        <h1>Hello{count}</h1>
        <button onClick={() => disp({type: "ACTION-UK"})}>click!</button>
    </div>
}