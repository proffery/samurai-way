import { instance, PhotosResponse, Response } from 'api/api-instance'

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileResponse>(`/profile/${userId}`)
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    changeStatus(newStatus: string) {
        return instance.put<Response>('/profile/status', { status: newStatus })
    },
    changeProfile(newData: ChangeProfileData) {
        return instance.put<Response>('/profile', newData)
    },
    changePhoto(image: File) {
        const formData = new FormData()
        formData.append('image', image)
        return instance.put<Response<{ photos: PhotosResponse }>>('/profile/photo', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
    }
}

export type GetProfileResponse = {
    userId: number
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: GetProfileContacts,
    photos: PhotosResponse
}

export type GetProfileContacts = {
    vk: string
    github: string
    website: string
    twitter: string
    youtube: string
    facebook: string
    mainLink: string
    instagram: string
}

export type ChangeProfileData = {
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: GetProfileContacts
}