import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '5bb84785-0aba-4f56-a56a-3dbda6de189f',
    }
})

export type UserResponseType = {
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
    items: UserResponseType[]
    error: number
    totalCount: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}


export type GetProfileResponseContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type GetProfileResponseType = {
    aboutMe: string
    contacts: GetProfileResponseContactsType,
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

export type GetMeDataType = {
    id: number,
    email: string,
    login: string
}
export type LoginDataType = {
    email: string
    password: string
    remember: boolean
}

export const socialNetworkAPI = {
    getUsers(pageNumber: number, usersOnPage: number) {
        return instance.get<GetUsersResponseType>(`/users?page=${pageNumber}&count=${usersOnPage}`)
    },
    isFollow(userId: number) {
        return instance.get<boolean>(`/follow/${userId}`)
    },
    followUser(userId: number) {
        return instance.post<ResponseType>(`/follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete<ResponseType>(`/follow/${userId}`)
    },
    getSortedUsers(pageNumber: number, usersOnPage: number, isFriend: boolean) {
        return instance.get<GetUsersResponseType>(`/users?page=${pageNumber}&count=${usersOnPage}&friend=${isFriend}`)
    },
    getProfile(userId: number) {
        return instance.get<GetProfileResponseType>(`/profile/${userId}`)
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    getMe() {
        return instance.get<ResponseType<GetMeDataType>>('/auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login')
    },
    login(loginData: LoginDataType) {
        return instance.post<ResponseType<{ userId: number }>>('/auth/login', loginData)
    }
}
