import { instance, PhotosResponseType, ResponseType } from 'api/socialNetworkInstance'

export const usersAPI = {
    getUsers(pageNumber: number, usersOnPage: number, isFriend: boolean | null, searchTerm: string) {
        return instance.get<GetUsersResponseType>(`/users?page=${pageNumber}&count=${usersOnPage}&friend=${isFriend}&term=${searchTerm}`)
    },
    isFollow(userId: number) {
        return instance.get<boolean>(`/follow/${userId}`)
    },
    followUser(userId: number) {
        return instance.post<ResponseType>(`/follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete<ResponseType>(`/follow/${userId}`)
    }
}

export type UserResponseType = {
    id: number
    name: string
    status: string
    followed: boolean
    uniqueUrlName: string
    photos: PhotosResponseType
}
type GetUsersResponseType = {
    error: number
    totalCount: number
    items: UserResponseType[]
}