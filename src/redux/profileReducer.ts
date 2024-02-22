import { v1 } from "uuid"
import { GetProfileResponseType, socialNetworkAPI } from "../api/social-network-api"
import { AppDispatchType, AppRootStateType } from "./redux-store"
import { AddAlertActionType, SetAppIsLoadingActionType, addAppAlert, setAppIsLoading } from "./appReducer"
import { FollowUserActionType, UnfollowUserActionType } from "./usersReducer"

const ADD_POST = 'ADD-POST'
const UPDATE_POST = 'UPDATE-POST'
const ON_CHANGE_POST = 'ON-CHANGE-POST'
const SET_PROFILE_DATA = 'SET-PROFILE-DATA'
const CHANGE_FOLLOWED_STATUS = 'CHANGE-FOLLOWED-STATUS'

export type ProfileReducerActionsType =
    | ReturnType<typeof addPostAction>
    | ReturnType<typeof updatePostAction>
    | ReturnType<typeof postOnChangeAction>
    | ReturnType<typeof setProfileDataAction>
    | ReturnType<typeof changeFollowStatusAction>
    | SetAppIsLoadingActionType
    | AddAlertActionType
    | FollowUserActionType
    | UnfollowUserActionType

export type PostStateType = {
    id: string
    message: string
    likeCount: number
    commentsCount: number
}

export interface ProfileDataType extends GetProfileResponseType {
    isFollow: boolean
}

export type ProfileStateType = {
    posts: PostStateType[]
    newPostForm: string
    data: ProfileDataType
}

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
        userId: 0,
        photos: {
            small: '',
            large: '',
        },
        isFollow: false
    }
}

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
            return { ...state, data: { ...action.payload.data, isFollow: false } }
        case CHANGE_FOLLOWED_STATUS:
            return { ...state, data: { ...state.data, isFollow: action.payload.isFollow } }
        default: return state
    }
}

export const addPostAction = (postMessage: string) => {
    const newPost: PostStateType = {
        id: v1(),
        message: postMessage,
        likeCount: 0,
        commentsCount: 0
    }
    return { type: ADD_POST, payload: { newPost } } as const
}

export const updatePostAction = (postId: string, newPost: string) => (
    { type: UPDATE_POST, payload: { newPost, postId } }
) as const

export const postOnChangeAction = (newPost: string) => (
    { type: ON_CHANGE_POST, payload: { newPost } }
) as const

export const setProfileDataAction = (data: GetProfileResponseType) => (
    { type: SET_PROFILE_DATA, payload: { data } }
) as const

export const changeFollowStatusAction = (isFollow: boolean) => (
    { type: CHANGE_FOLLOWED_STATUS, payload: { isFollow } }
) as const

export const addPost = () => (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
    const newPost = getState().profile.newPostForm
    dispatch(addPostAction(newPost))
    dispatch(postOnChangeAction(''))
}

export const setProfileData = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.getProfile(userId)
        .then(res => {
            dispatch(setProfileDataAction(res.data))
            return socialNetworkAPI.isFollow(userId)
        })
        .then(res => {
            dispatch(changeFollowStatusAction(res.data))
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
                dispatch(changeFollowStatusAction(true))
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
                dispatch(changeFollowStatusAction(false))
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