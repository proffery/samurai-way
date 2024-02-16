import { AnyAction, Dispatch } from "redux"
import { v1 } from "uuid"
import { GetProfileResponseType, socialNetworkAPI } from "../api/social-network-api"
import { AppDispatchType, AppRootStateType } from "./redux-store"
import { SetAlertMessageActionType, SetAppRequestStatusActionType, setAppRequestStatusAC } from "./appReducer"
import { showGlobalAppStatus } from "./utils/setGlobalAppStatus"
import { FollowUserActionType, UnfollowUserActionType, followUsersTC } from "./usersReducer"

const ADD_POST = 'ADD-POST'
const UPDATE_POST = 'UPDATE-POST'
const ON_CHANGE_POST = 'ON-CHANGE-POST'
const SET_PROFILE_DATA = 'SET-PROFILE-DATA'
const CHANGE_FOLLOWED_STATUS = 'CHANGE-FOLLOWED-STATUS'

export type ProfileReducerActionsType =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof updatePostAC>
    | ReturnType<typeof postOnChangeAC>
    | ReturnType<typeof setProfileDataAC>
    | ReturnType<typeof changeFollowStatusAC>
    | SetAppRequestStatusActionType
    | SetAlertMessageActionType
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

export const addPostAC = (postMessage: string) => {
    const newPost: PostStateType = {
        id: v1(),
        message: postMessage,
        likeCount: 0,
        commentsCount: 0
    }
    return { type: ADD_POST, payload: { newPost } } as const
}

export const updatePostAC = (postId: string, newPost: string) => (
    { type: UPDATE_POST, payload: { newPost, postId } }
) as const

export const postOnChangeAC = (newPost: string) => (
    { type: ON_CHANGE_POST, payload: { newPost } }
) as const

export const setProfileDataAC = (data: GetProfileResponseType) => (
    { type: SET_PROFILE_DATA, payload: { data } }
) as const

export const changeFollowStatusAC = (isFollow: boolean) => (
    { type: CHANGE_FOLLOWED_STATUS, payload: { isFollow } }
) as const

export const addPostTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const newPost = getState().profile.newPostForm
    dispatch(addPostAC(newPost))
    dispatch(postOnChangeAC(''))
}

export const getProfileDataTC = (userId: number) => (dispatch: Dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.getProfile(userId)
        .then(res => {
            dispatch(setProfileDataAC(res.data))
            return socialNetworkAPI.isFollow(userId)
        })
        .then(res => {
            dispatch(changeFollowStatusAC(res.data))
            dispatch(setAppRequestStatusAC(null))
        })
        .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
}

export const followFromProfile = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.followUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeFollowStatusAC(true))
                showGlobalAppStatus(dispatch, 'succeeded', 'Followed!')
            }
            else {
                showGlobalAppStatus(dispatch, 'failed', res.data.messages[0])
            }
        })
        .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
}

export const unfollowFromProfile = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.unfollowUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeFollowStatusAC(false))
                showGlobalAppStatus(dispatch, 'succeeded', 'Unfollowed!')
            }
            else {
                showGlobalAppStatus(dispatch, 'failed', res.data.messages[0])
            }
        })
        .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
}