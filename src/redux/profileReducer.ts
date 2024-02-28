import { v1 } from "uuid"
import { GetProfileResponseType, socialNetworkAPI } from "../api/social-network-api"
import { AppDispatchType, AppRootStateType } from "./redux-store"
import { AddAlertActionType, SetAppIsLoadingActionType, addAppAlert, setAppIsLoading } from "./appReducer"
import { FollowUserActionType, UnfollowUserActionType } from "./usersReducer"
import { CLEAN_REDUCER, CleanReducerType } from "./authReducer"

//CONSTANTS
const ADD_POST = 'ADD-POST'
const UPDATE_POST = 'UPDATE-POST'
const ON_CHANGE_POST = 'ON-CHANGE-POST'
const SET_PROFILE_DATA = 'SET-PROFILE-DATA'
const SET_FOLLOW_STATUS = 'SET-FOLLOW-STATUS'
const SET_STATUS = 'SET-STATUS'

//INITIAL STATE
const initialState: ProfileStateType = {
    posts: [],
    newPostForm: '',
    data: {
        aboutMe: '',
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
        status: ''
    }
}

//REDUCER
export const profileReducer = (state: ProfileStateType = initialState, action: ProfileReducerActionsType): ProfileStateType => {
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
        socialNetworkAPI.getProfile(userId)
            .then(res => {
                dispatch(setProfileData(res.data))
                if (res.data.userId !== getState().auth.id)
                    return socialNetworkAPI.isFollow(userId)
                else return { data: false }
            })
            .then(res => {
                dispatch(setFollowStatus(res.data))
                return socialNetworkAPI.getProfileStatus(userId)
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
    socialNetworkAPI.followUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
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
    socialNetworkAPI.unfollowUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
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

//TYPES
export type ProfileReducerActionsType =
    | ReturnType<typeof setPost>
    | ReturnType<typeof updatePost>
    | ReturnType<typeof postOnChange>
    | ReturnType<typeof setProfileData>
    | ReturnType<typeof setFollowStatus>
    | ReturnType<typeof setStatus>
    | SetAppIsLoadingActionType
    | AddAlertActionType
    | FollowUserActionType
    | UnfollowUserActionType
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
}