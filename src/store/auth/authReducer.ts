import { authAPI, GetMeData, LoginData } from 'api/authAPI'
import { profileAPI } from 'api/profileAPI'
import { ResultCode } from 'api/socialNetworkInstance'
import { AppDispatchType } from 'store/redux-store'
import {
    initializeApp, addAppAlert, SetAppIsLoadingActionType,
    SetAppIsInitializedType, setAppIsLoading
} from 'store/app/appReducer'
import { handleServerNetworkError } from 'utils/handle-server-network-error'


//CONSTANTS
const SET_AUTH_DATA = 'AUTH/SET-AUTH-DATA'
const SET_IS_LOGGED_IN = 'AUTH/SET-IS-LOGGED-IN'
const SET_PHOTO_URL = 'AUTH/SET-PHOTO-URL'
export const CLEAR_REDUCER = 'AUTH/CLEAR-REDUCER'

//INITIAL STATE
export const initialState: AuthStateType = {
    id: 2,
    email: '',
    login: '',
    isLoggedIn: false,
    photoUrl: ''
}

//REDUCER
export const authReducer = (state: AuthStateType = initialState, action: AuthReducerActionsType): AuthStateType => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return { ...state, ...action.payload.data }
        case SET_IS_LOGGED_IN:
            return { ...state, isLoggedIn: action.payload.value }
        case SET_PHOTO_URL:
            return { ...state, photoUrl: action.payload.photoUrl }
        case CLEAR_REDUCER:
            return initialState
        default:
            return state
    }
}

//ACTIONS
export type CleanReducerType = ReturnType<typeof cleanReducer>
export const setAuthUserData = (data: GetMeData) =>
    ({ type: SET_AUTH_DATA, payload: { data } }) as const
export const setIsLoggedIn = (value: boolean) =>
    ({ type: SET_IS_LOGGED_IN, payload: { value } }) as const
export const setAuthUserPhoto = (photoUrl: string) =>
    ({ type: SET_PHOTO_URL, payload: { photoUrl } }) as const
export const cleanReducer = () =>
    ({ type: CLEAR_REDUCER }) as const

//THUNKS
export const getAuthPhoto = (authId: number) => async (dispatch: AppDispatchType) => {
    try {
        const res = await profileAPI.getProfile(authId)
        dispatch(setAuthUserPhoto(res.data.photos.small))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const login = (loginData: LoginData) => async (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    try {
        const res = await authAPI.login(loginData)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(initializeApp())
        }
        else {
            dispatch(addAppAlert('failed', res.data.messages[0]))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally { dispatch(setAppIsLoading(false)) }
}

export const logout = () => async (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(setIsLoggedIn(false))
            dispatch(cleanReducer())
        }
        else {
            dispatch(addAppAlert('failed', res.data.messages[0]))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally { dispatch(setAppIsLoading(false)) }
}

//TYPES
export type AuthReducerActionsType =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setAuthUserPhoto>
    | SetAppIsLoadingActionType
    | SetAppIsInitializedType
    | CleanReducerType
export interface AuthStateType extends GetMeData {
    isLoggedIn: boolean
    photoUrl: string
}

export const authThunks = { logout, login, getAuthPhoto }