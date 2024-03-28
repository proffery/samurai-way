import { authAPI, GetMeData, LoginData } from 'api/authAPI'
import { profileAPI } from 'api/profileAPI'
import { ResultCode } from 'api/api-instance'
import { AppDispatch } from 'store/redux-store'
import {
    initializeApp, addAppAlert, SetAppIsLoading,
    SetAppIsInitialized, setAppIsLoading
} from 'store/app/appReducer'
import { handleServerNetworkError } from 'utils/handleServerNetworkError'
import { securityAPI } from 'api/securityAPI'


//CONSTANTS
const SET_AUTH_DATA = 'AUTH/SET-AUTH-DATA'
const SET_IS_LOGGED_IN = 'AUTH/SET-IS-LOGGED-IN'
const SET_PHOTO_URL = 'AUTH/SET-PHOTO-URL'
const SET_CAPTCHA_URL = 'AUTH/SET-CAPTCHA-URL'
export const CLEAR_REDUCER = 'AUTH/CLEAR-REDUCER'

//INITIAL STATE
export const initialState: AuthState = {
    id: 2,
    email: '',
    login: '',
    isLoggedIn: false,
    photoUrl: '',
    captchaUrl: ''
}

//REDUCER
export const authReducer = (state: AuthState = initialState, action: AuthReducerActions): AuthState => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return { ...state, ...action.payload.data }
        case SET_IS_LOGGED_IN:
            return { ...state, isLoggedIn: action.payload.value }
        case SET_PHOTO_URL:
            return { ...state, photoUrl: action.payload.photoUrl }
        case SET_CAPTCHA_URL:
            return { ...state, captchaUrl: action.payload.captchaUrl }
        case CLEAR_REDUCER:
            return initialState
        default:
            return state
    }
}

//ACTIONS
export const setAuthUserData = (data: GetMeData) =>
    ({ type: SET_AUTH_DATA, payload: { data } }) as const
export const setIsLoggedIn = (value: boolean) =>
    ({ type: SET_IS_LOGGED_IN, payload: { value } }) as const
export const setAuthUserPhoto = (photoUrl: string) =>
    ({ type: SET_PHOTO_URL, payload: { photoUrl } }) as const
export const setCaptchaUrl = (captchaUrl: string) =>
    ({ type: SET_CAPTCHA_URL, payload: { captchaUrl } }) as const
export const cleanReducer = () =>
    ({ type: CLEAR_REDUCER }) as const

//THUNKS
export const getAuthPhoto = (authId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await profileAPI.getProfile(authId)
        dispatch(setAuthUserPhoto(res.data.photos.small))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const login = (loginData: LoginData) => async (dispatch: AppDispatch) => {
    dispatch(setAppIsLoading(true))
    try {
        const res = await authAPI.login(loginData)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(initializeApp())
        }
        else {
            if (res.data.resultCode === ResultCode.captcha) {
                dispatch(getCaptchaUrl())
            }
            dispatch(addAppAlert('failed', res.data.messages[0]))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally { dispatch(setAppIsLoading(false)) }
}

export const logout = () => async (dispatch: AppDispatch) => {
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

export const getCaptchaUrl = () => async (dispatch: AppDispatch) => {
    dispatch(setAppIsLoading(true))
    try {
        const res = await securityAPI.getCaptchaUrl()
        dispatch(setCaptchaUrl(res.data.url))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally { dispatch(setAppIsLoading(false)) }
}

//TYPES
export type AuthReducerActions =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setAuthUserPhoto>
    | ReturnType<typeof setCaptchaUrl>
    | SetAppIsLoading
    | SetAppIsInitialized
    | CleanReducers
export type CleanReducers = ReturnType<typeof cleanReducer>
export interface AuthState extends GetMeData {
    isLoggedIn: boolean
    photoUrl: string,
    captchaUrl: string
}

export const authThunks = { logout, login, getAuthPhoto, setCaptchaUrl }