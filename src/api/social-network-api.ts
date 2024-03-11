import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '5bb84785-0aba-4f56-a56a-3dbda6de189f',
    }
})

export const usersAPI = {
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
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileResponseType>(`/profile/${userId}`)
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    changeStatus(newStatus: string) {
        return instance.put<ResponseType>('/profile/status', { status: newStatus })
    },
    changeProfile(newData: ChangeProfileDataType) {
        return instance.put<ResponseType>('/profile', newData)
    }
}

export const authAPI = {
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

//ENUM
export const ResultCode = {
    error: 1,
    success: 0,
    captcha: 10
} as const

//TYPES
export type UserResponseType = {
    id: number
    name: string
    status: string
    followed: boolean
    uniqueUrlName: string
    photos: {
        small: string,
        large: string
    }
}
type GetUsersResponseType = {
    error: number
    totalCount: number
    items: UserResponseType[]
}
export type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}
export type GetProfileResponseContactsType = {
    vk: string
    github: string
    website: string
    twitter: string
    youtube: string
    facebook: string
    mainLink: string
    instagram: string
}
export type GetProfileResponseType = {
    userId: number
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: GetProfileResponseContactsType,
    photos: {
        small: string
        large: string
    }
}
export type GetMeDataType = {
    id: number
    email: string
    login: string
}
export type LoginDataType = {
    email: string
    password: string
    remember: boolean
}
export type ChangeProfileDataType = {
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: GetProfileResponseContactsType
}
