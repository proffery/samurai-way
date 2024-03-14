import {
    GetProfileResponseType, ResultCode, GetProfileResponseContactsType,
    ChangeProfileDataType, profileAPI, usersAPI
} from 'api/social-network-api'
import { setAppIsLoading, addAppAlert, SetAppIsLoadingActionType, AddAlertActionType } from 'store/app/appReducer'
import { CLEAN_REDUCER, CleanReducerType } from 'store/auth/authReducer'
import { AppDispatchType, AppRootStateType } from 'store/redux-store'
import { FollowUserActionType, UnfollowUserActionType } from 'store/users/usersReducer'
import { v1 } from 'uuid'


//CONSTANTS
const ADD_POST = 'ADD-POST'
const UPDATE_POST = 'UPDATE-POST'
const ON_CHANGE_POST = 'ON-CHANGE-POST'
const SET_PROFILE_DATA = 'SET-PROFILE-DATA'
const SET_FOLLOW_STATUS = 'SET-FOLLOW-STATUS'
const SET_STATUS = 'SET-STATUS'

//INITIAL STATE
export const initialState = {
    posts: [],
    newPostForm: '',
    data: {
        aboutMe: 'Human',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: ''
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        userId: 2,
        photos: {
            small: '',
            large: '',
        },
        isFollow: false,
        status: '',
    },
    contactsIcons: [
        {
            id: 1,
            name: "facebook" as string,
            href: "#",
            icon_id: "facebook",
            viewBox: "0 0 24 24",
        },
        {
            id: 2,
            name: "twitter" as string,
            href: "#",
            icon_id: "twitter",
            viewBox: "0 0 24 24",
        },
        {
            id: 3,
            name: "instagram" as string,
            href: "#",
            icon_id: "instagram",
            viewBox: "0 0 24 24",
        },
        {
            id: 4,
            name: "youtube" as string,
            href: "#",
            icon_id: "youtube",
            viewBox: "0 0 24 24",
        },
        {
            id: 5,
            name: "github" as string,
            href: "#",
            icon_id: "github",
            viewBox: "-10 -10 150 150",
        },
        {
            id: 6,
            name: "vk" as string,
            href: "#",
            icon_id: "vk",
            viewBox: "-3 -3 40 40",
        },
        {
            id: 7,
            name: "website" as string,
            href: "#",
            icon_id: "home",
            viewBox: "-2 -2 24 24",
        },
        {
            id: 8,
            name: "mainLink" as string,
            href: "#",
            icon_id: "linkedin",
            viewBox: "0 2 24 24",
        }
    ],
}

//REDUCER
export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case ADD_POST:
            return { ...state, posts: [action.payload.newPost, ...state.posts] }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(el => el.id === action.payload.postId
                    ? { ...el, message: action.payload.newPost }
                    : el
                )
            }
        case ON_CHANGE_POST:
            return { ...state, newPostForm: action.payload.newPost }
        case SET_PROFILE_DATA:
            return { ...state, data: { ...action.payload.data, isFollow: false, status: '' } }
        case SET_FOLLOW_STATUS:
            return { ...state, data: { ...state.data, isFollow: action.payload.isFollow } }
        case SET_STATUS:
            return { ...state, data: { ...state.data, status: action.payload.status } }
        case CLEAN_REDUCER:
            return initialState
        default: return state
    }
}

//ACTIONS
export const setPost = (postMessage: string) => {
    const newPost: PostStateType = {
        id: v1(),
        message: postMessage,
        likeCount: 0,
        commentsCount: 0
    }
    return { type: ADD_POST, payload: { newPost } } as const
}
export const updatePost = (postId: string, newPost: string) => (
    { type: UPDATE_POST, payload: { newPost, postId } }) as const
export const postOnChange = (newPost: string) => (
    { type: ON_CHANGE_POST, payload: { newPost } }) as const
export const setProfileData = (data: GetProfileResponseType) => (
    { type: SET_PROFILE_DATA, payload: { data } }) as const
export const setFollowStatus = (isFollow: boolean) => (
    { type: SET_FOLLOW_STATUS, payload: { isFollow } }) as const
export const setStatus = (status: string) => (
    { type: SET_STATUS, payload: { status } }) as const

//THUNKS
export const addPost = () => (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
    const newPost = getState().profile.newPostForm
    dispatch(setPost(newPost))
    dispatch(postOnChange(''))
}
export const getProfileData = (userId: number) =>
    (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
        dispatch(setAppIsLoading(true))
        profileAPI.getProfile(userId)
            .then(res => {
                dispatch(setProfileData(res.data))
                if (res.data.userId !== getState().auth.id)
                    return usersAPI.isFollow(userId)
                else return { data: false }
            })
            .then(res => {
                dispatch(setFollowStatus(res.data))
                return profileAPI.getProfileStatus(userId)
            })
            .then(res => {
                dispatch(setStatus(res.data))
            })
            .catch(error => {
                dispatch(addAppAlert('failed', error.message))
            })
            .finally(() => dispatch(setAppIsLoading(false)))
    }
export const followProfile = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    usersAPI.followUser(userId)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setFollowStatus(true))
                dispatch(addAppAlert('succeeded', 'Followed!'))
            }
            else {
                dispatch(addAppAlert('failed', res.data.messages[0]))
            }
        })
        .catch(error => {
            dispatch(addAppAlert('failed', error.message))
        })
        .finally(() => dispatch(setAppIsLoading(false)))
}
export const unfollowProfile = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    usersAPI.unfollowUser(userId)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setFollowStatus(false))
                dispatch(addAppAlert('succeeded', 'Unfollowed!'))
            }
            else {
                dispatch(addAppAlert('failed', res.data.messages[0]))
            }
        })
        .catch(error => {
            dispatch(addAppAlert('failed', error.message))
        })
        .finally(() => dispatch(setAppIsLoading(false)))
}
export const changeProfileStatus = (newStatus: string) =>
    (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
        if (newStatus !== getState().profile.data.status) {
            dispatch(setAppIsLoading(true))
            profileAPI.changeStatus(newStatus)
                .then(res => {
                    if (res.data.resultCode === ResultCode.success) {
                        dispatch(setStatus(newStatus))
                        dispatch(addAppAlert('succeeded', 'Status changed!'))
                    }
                    else {
                        dispatch(addAppAlert('failed', res.data.messages[0]))
                    }
                })
                .catch(error => {
                    dispatch(addAppAlert('failed', error.message))
                })
                .finally(() => dispatch(setAppIsLoading(false)))
        }
    }
export const changeProfileContacts = (contacts: GetProfileResponseContactsType) =>
    (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
        const { aboutMe, fullName, lookingForAJob, lookingForAJobDescription } = getState().profile.data
        const model: ChangeProfileDataType = {
            aboutMe: aboutMe || 'no info',
            contacts: contacts,
            fullName: fullName,
            lookingForAJob: lookingForAJob,
            lookingForAJobDescription: lookingForAJobDescription || 'no info'
        }
        dispatch(setAppIsLoading(true))
        profileAPI.changeProfile(model)
            .then(res => {
                if (res.data.resultCode === ResultCode.success) {
                    const oldProfileData = getState().profile.data
                    const oldStatus = getState().profile.data.status
                    dispatch(setProfileData({ ...oldProfileData, ...model }))
                    dispatch(setStatus(oldStatus))
                    dispatch(addAppAlert('succeeded', 'Contacts are changed!'))
                }
                else {
                    dispatch(addAppAlert('failed', res.data.messages[0]))
                }
            })
            .catch(error => {
                dispatch(addAppAlert('failed', error.message))
            })
            .finally(() => dispatch(setAppIsLoading(false)))
    }
export const changeProfileAbout = (about: ChangeAboutProfileType) =>
    (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
        const { contacts } = getState().profile.data
        const model: ChangeProfileDataType = {
            aboutMe: about.aboutMe || 'no info',
            contacts: contacts,
            fullName: about.fullName,
            lookingForAJob: about.lookingForAJob,
            lookingForAJobDescription: about.lookingForAJobDescription || 'no info'
        }
        dispatch(setAppIsLoading(true))
        profileAPI.changeProfile(model)
            .then(res => {
                if (res.data.resultCode === ResultCode.success) {
                    const oldProfileData = getState().profile.data
                    const oldStatus = getState().profile.data.status
                    dispatch(setProfileData({ ...oldProfileData, ...model }))
                    dispatch(setStatus(oldStatus))
                    dispatch(addAppAlert('succeeded', 'About is changed!'))
                }
                else {
                    dispatch(addAppAlert('failed', res.data.messages[0]))
                }
            })
            .catch(error => {
                dispatch(addAppAlert('failed', error.message))
            })
            .finally(() => dispatch(setAppIsLoading(false)))
    }

//TYPES
export type ProfileActionsType =
    | ReturnType<typeof setPost>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof updatePost>
    | ReturnType<typeof postOnChange>
    | ReturnType<typeof setProfileData>
    | ReturnType<typeof setFollowStatus>
    | SetAppIsLoadingActionType
    | UnfollowUserActionType
    | FollowUserActionType
    | AddAlertActionType
    | CleanReducerType

export type PostStateType = {
    id: string
    message: string
    likeCount: number
    commentsCount: number
}
export interface ProfileDataType extends GetProfileResponseType {
    isFollow: boolean
    status: string
}
export type ProfileStateType = {
    posts: PostStateType[]
    newPostForm: string
    data: ProfileDataType
    contactsIcons: typeof initialState.contactsIcons
}
export type ChangeAboutProfileType = {
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}
export type ContactsIconsType = typeof initialState.contactsIcons