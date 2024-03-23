import { instance, PhotosResponseType, ResponseType } from 'api/socialNetworkInstance'

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
        return instance.put<ResponseType<{ photos: PhotosResponseType }>>('/profile/photo', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
    }
}

export type GetProfileResponseType = {
    userId: number
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: GetProfileResponseContactsType,
    photos: PhotosResponseType
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

export type ChangeProfileDataType = {
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: GetProfileResponseContactsType
}