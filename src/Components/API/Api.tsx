import axios, {AxiosResponse} from 'axios'
import {UserType} from '../Store/UsersReducer';

const instance = axios.create({
    baseURL: 'http://localhost:3001/'
})
type AxosUser = {
    users: Array<UserType>
}
export const api = {
    getUser() {
        return instance.get('users')
    },
    // getUser(): Promise<AxiosResponse<AxosUser>> {
    //     return instance.get<AxosUser>('users')
    // },
    addUser(obj: UserType) {
        return instance.post('users', {...obj})
    },
    deleteUser(id: number) {
        return instance.delete(`users/${id}`,)
    }
}