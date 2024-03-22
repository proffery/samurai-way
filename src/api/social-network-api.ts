import axios, { AxiosError } from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '5bb84785-0aba-4f56-a56a-3dbda6de189f',
    }
})

export type ServerNetworkErrorType = Error | AxiosError<{ error: string }>

export const usersAPI = {
    getUsers(pageNumber: number, usersOnPage: number, isFriend: boolean | null, searchTerm: string) {
        return instance.get<GetUsersResponseType>
            (`/users?page=${pageNumber}&count=${usersOnPage}&friend=${isFriend}&term=${searchTerm}`)
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
    },
    changePhoto(image: File) {
        const formData = new FormData()
        formData.append('image', image)
        return instance.put<ResponseType<PhotosResponseType>>('/profile/photo', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
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

export const dialogsAPI = {
    getDialogs() {
        return instance.get<DialogResponseType[]>('dialogs')
    },
    startDialog(userId: number) {
        return instance.put<ResponseType>(`dialogs/${userId}`)
    },
    getMessages(userId: number, pageNumber: number, messagesCount: number) {
        return instance.get<GetMessagesResponseType>(`dialogs/${userId}/messages?page=${pageNumber}&count=${messagesCount}`)
    },
    sendMessage(userId: number, message: string) {
        return instance.post<ResponseType<{ message: AddMessageResponseType }>>(`dialogs/${userId}/messages`, { body: message })
    },
    checkIsMessageReaded(messageId: number) {
        return instance.get<ResponseType>(`dialogs/messages/${messageId}/viewed`)
    },
    sendMessageToSpam(messageId: number) {
        return instance.post<ResponseType>(`dialogs/messages/${messageId}/spam`)
    },
    deleteMessage(messageId: number) {
        return instance.delete<ResponseType>(`dialogs/messages/${messageId}`)
    },
    restoreMessage(messageId: number) {
        return instance.put<ResponseType>(`dialogs/messages/${messageId}/restore`)
    },
    getMessagesByDate(userId: number, date: string) {
        return instance.get<ResponseType>(`dialogs/${userId}/messages/new?newerThen=${date}`)
    },
    getNewMessages() {
        return instance.get<ResponseType>('dialogs/messages/new/count')
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
    fieldsErrors: string[]
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
export type PhotosResponseType = {
    photos: {
        small: string,
        large: string
    }
}
export type DialogResponseType = {
    id: number
    userName: string
    hasNewMessages: boolean
    newMessagesCount: number
    photos: {
        small: string,
        large: string
    }
    lastUserActivityDate: string
    lastDialogActivityDate: string
}
export type AddMessageResponseType = {
    id: string
    body: string
    translatedBody: string | null
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    recipientName: string
    viewed: false
    deletedBySender: false
    deletedByRecipient: false
    isSpam: false
    distributionId: number | null
}

export type MessageResponseType = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: string | null
    viewed: boolean
}
export type GetMessagesResponseType = {
    error: string | null
    items: MessageResponseType[]
    totalCount: number
}