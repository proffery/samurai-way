import { GetMeDataType, socialNetworkAPI } from '../api/social-network-api';
import { SetAppRequestStatusActionType, setAppRequestStatusAC } from './appReducer';
import { showGlobalAppStatus } from './utils/showGlobalAppStatus';
import { AppDispatchType } from './redux-store';
import { Dispatch } from 'redux';

const SET_AUTH_DATA = 'AUTH/SET-AUTH-DATA'
const SET_IS_LOGGED_IN = 'AUTH/SET-IS-LOGGED-IN'
const SET_PHOTO_URL = 'AUTH/SET-PHOTO-URL'

export type AuthReducerActionsType =
    | ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setPhotoUrlAC>
    | SetAppRequestStatusActionType

export interface AuthReducerType extends GetMeDataType {
    isLoggedIn: boolean
    photoUrl: string
}

const initialState: AuthReducerType = {
    id: 0,
    email: '',
    login: '',
    isLoggedIn: false,
    photoUrl: ''
}

export const authReducer = (state: AuthReducerType = initialState, action: AuthReducerActionsType): AuthReducerType => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return { ...state, ...action.payload.data }
        case SET_IS_LOGGED_IN:
            return { ...state, isLoggedIn: action.payload.value }
        case SET_PHOTO_URL:
            return { ...state, photoUrl: action.payload.photoUrl }
        default:
            return state
    }
}

export const setAuthUserDataAC = (data: GetMeDataType) =>
    ({ type: SET_AUTH_DATA, payload: { data } }) as const

export const setIsLoggedInAC = (value: boolean) =>
    ({ type: SET_IS_LOGGED_IN, payload: { value } }) as const

export const setPhotoUrlAC = (photoUrl: string) =>
    ({ type: SET_PHOTO_URL, payload: { photoUrl } }) as const

export const getAuthUserData = () =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppRequestStatusAC('loading'))
        socialNetworkAPI.getMe()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC(res.data.data))
                    dispatch(setIsLoggedInAC(true))
                }
                else {
                    dispatch(setIsLoggedInAC(false))
                    showGlobalAppStatus(dispatch, 'failed', res.data.messages[0])
                }
                return socialNetworkAPI.getProfile(res.data.data.id)
            })
            .then(res => {
                dispatch(setPhotoUrlAC(res.data.photos.small))
                dispatch(setAppRequestStatusAC(null))
            })
            .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
    }

export const logout = () => (dispatch : AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.logout()
    .then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppRequestStatusAC(null))
        }
        else {
            showGlobalAppStatus(dispatch, 'failed', res.data.messages[0])
        }
    })
}