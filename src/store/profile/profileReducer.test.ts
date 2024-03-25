import {
    profileReducer,
    initialState,
    setProfileData,
    setFollowStatus,
    setStatus,
    ProfileStateType,
    ProfileActionsType,
    setPhotos
} from './profileReducer'
import { v1 } from 'uuid'
import { cleanReducer } from 'store/auth/authReducer'
import { GetProfileResponse } from 'api/profileAPI'
import { PhotosResponse } from 'api/socialNetworkInstance'

describe('Profile reducer', () => {
    it('profile reducer should return the initial state', () => {
        expect(profileReducer(undefined, {} as ProfileActionsType)).toEqual(initialState)
    })

    it('should correctly update the profile data', () => {
        const startState: ProfileStateType = { ...initialState }
        const data: GetProfileResponse = {
            aboutMe: 'Updated about me',
            contacts: {
                facebook: v1(),
                website: v1(),
                vk: v1(),
                twitter: v1(),
                instagram: v1(),
                youtube: v1(),
                github: v1(),
                mainLink: v1(),
            },
            lookingForAJob: true,
            lookingForAJobDescription: v1(),
            fullName: v1(),
            userId: 0,
            photos: {
                small: v1(),
                large: v1(),
            },
        }

        const action = setProfileData(data)
        const expectedState = profileReducer(startState, action)

        expect(expectedState.data.contacts).toEqual(data.contacts)
        expect(expectedState.data.photos).toEqual(data.photos)
        expect(expectedState.data.aboutMe).toBe('Updated about me')
        expect(expectedState.data.lookingForAJob).toBe(true)
        expect(expectedState.data.lookingForAJobDescription).toBe(data.lookingForAJobDescription)
        expect(expectedState.data.fullName).toBe(data.fullName)
        expect(expectedState.data.userId).toBe(0)
    })

    it('should update the follow status', () => {
        const startState = {
            ...initialState, data: {
                ...initialState.data,
                isFollow: false
            }
        }
        const action = setFollowStatus(true)
        const expectedState = profileReducer(startState, action)
        expect(expectedState.data.isFollow).toBe(true)
    })

    it('should update the status', () => {
        const status = 'Updated status'
        const startState: ProfileStateType = {
            ...initialState, data: {
                ...initialState.data,
                status: ''
            }
        }
        const action = setStatus(status)
        const expectedState = profileReducer(startState, action)
        expect(expectedState.data.status).toBe(status)
    })
    it('should update the photos', () => {
        const photosData: { photos: PhotosResponse } = {
            photos: {
                large: 'https://example.com/photo-large.jpg',
                small: 'https://example.com/photo-small.jpg'
            }
        }
        const startState: ProfileStateType = {
            ...initialState, data: {
                ...initialState.data,
                photos: {
                    large: '',
                    small: ''
                }
            }
        }
        const action = setPhotos(photosData)
        const expectedState: ProfileStateType = profileReducer(startState, action)
        expect(expectedState.data.photos).toEqual(photosData.photos)
        expect(expectedState.data.photos.large).toBe(photosData.photos.large)
        expect(expectedState.data.photos.small).toBe(photosData.photos.small)
    })

    it('should reset profile state to the initial', () => {
        const startState: ProfileStateType = {
            posts: [
                { id: '1', message: 'Hello, world!', likeCount: 0, commentsCount: 0 },
            ],
            newPostForm: 'New post',
            data: {
                aboutMe: 'Updated about me',
                contacts: {
                    facebook: '',
                    website: '',
                    vk: '',
                    twitter: '',
                    instagram: '',
                    youtube: '',
                    github: '',
                    mainLink: '',
                },
                lookingForAJob: false,
                lookingForAJobDescription: '',
                fullName: '',
                userId: 22,
                photos: {
                    small: '',
                    large: '',
                },
                isFollow: true,
                status: 'Updated status',
            },
            contactsIcons: [],
        }
        const action = cleanReducer()
        const expectedState = profileReducer(startState, action)
        expect(expectedState).toEqual(initialState)
    })
})  