import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '5bb84785-0aba-4f56-a56a-3dbda6de189f',
    }
})

export type UserStateType = {
    id: number
    followed: boolean
    name: string
    photos: {
        small: string,
        large: string
    }
    status: string
    uniqueUrlName: string
}

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
    getUsers(pageNumber: number, usersOnPage: number) {
        return instance.get<GetUsersResponseType>(`/users?page=${pageNumber}&count=${usersOnPage}`)
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