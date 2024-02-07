import axios from "axios";
import { UserStateType } from "../redux/usersReducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '5bb84785-0aba-4f56-a56a-3dbda6de189f',
    }
})

type GetUsersResponseType = {
    items: UserStateType[]
    error: number
    totalCount: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

export const socialNetworkAPI = {
    getUsers() {
        return instance.get<GetUsersResponseType>('/users')
    },
    followUser(userId: number) {
        return instance.post<ResponseType>(`/follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete<ResponseType>(`/follow/${userId}`)
    },
    getFriends() {
        return instance.get<GetUsersResponseType>('/users?friend=true')
    },
    getPossibleFriends() {
        return instance.get<GetUsersResponseType>('/users?friend=false')
    },
}