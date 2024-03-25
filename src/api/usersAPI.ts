import { instance, ItemsResponse, PhotosResponse, Response } from 'api/socialNetworkInstance'

export const usersAPI = {
    getUsers(pageNumber: number, usersOnPage: number, isFriend: boolean | null, searchTerm: string) {
        return instance.get<ItemsResponse<UserResponse[]>>(`/users?page=${pageNumber}&count=${usersOnPage}&friend=${isFriend}&term=${searchTerm}`)
    },
    isFollow(userId: number) {
        return instance.get<boolean>(`/follow/${userId}`)
    },
    followUser(userId: number) {
        return instance.post<Response>(`/follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete<Response>(`/follow/${userId}`)
    }
}

export type UserResponse = {
    id: number
    name: string
    status: string
    followed: boolean
    uniqueUrlName: string
    photos: PhotosResponse
}