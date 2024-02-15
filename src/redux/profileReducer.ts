import { Dispatch } from "redux"
import { v1 } from "uuid"
import { GetProfileResponseType, socialNetworkAPI } from "../api/social-network-api"
import { AppRootStateType } from "./redux-store"
import { SetAlertMessageActionType, SetAppRequestStatusActionType, setAppRequestStatusAC } from "./appReducer"
import { showGlobalAppStatus } from "./utils/setGlobalAppStatus"

export const ADD_POST = 'ADD-POST'
export const UPDATE_POST = 'UPDATE-POST'
export const ON_CHANGE_POST = 'ON-CHANGE-POST'
export const SET_PROFILE_DATA = 'SET-PROFILE-DATA'

export type ProfileReducerActionsType =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof updatePostAC>
    | ReturnType<typeof postOnChangeAC>
    | ReturnType<typeof setProfileDataAC>
    | SetAppRequestStatusActionType
    | SetAlertMessageActionType

export type PostStateType = {
    id: string
    message: string
    likeCount: number
    commentsCount: number
}

export type ProfileStateType = {
    posts: PostStateType[]
    newPostForm: string
    data: GetProfileResponseType
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
        }
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
            return { ...state, data: action.payload.data }
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

export const addPostTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const newPost = getState().profile.newPostForm
    dispatch(addPostAC(newPost))
    dispatch(postOnChangeAC(''))
}

export const getProfileDataTC = (userId: number) => (dispatch : Dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.getProfile(userId)
    .then(res => {
        dispatch(setProfileDataAC(res.data))
        dispatch(setAppRequestStatusAC('succeeded'))
    })
    .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
}