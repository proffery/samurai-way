import { GetMeDataType, LoginDataType, socialNetworkAPI } from '../api/social-network-api'
import { SetAppIsLoadingActionType, addAppAlert, setAppIsLoading } from './appReducer'
import { AppDispatchType } from './redux-store'

const SET_AUTH_DATA = 'AUTH/SET-AUTH-DATA'
const SET_IS_LOGGED_IN = 'AUTH/SET-IS-LOGGED-IN'
const SET_PHOTO_URL = 'AUTH/SET-PHOTO-URL'

export type AuthReducerActionsType =
    | ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setPhotoUrlAC>
    | SetAppIsLoadingActionType

export interface AuthStateType extends GetMeDataType {
    isLoggedIn: boolean
    photoUrl: string
}

const initialState: AuthStateType = {
    id: 0,
    email: '',
    login: '',
    isLoggedIn: false,
    photoUrl: ''
}

export const authReducer = (state: AuthStateType = initialState, action: AuthReducerActionsType): AuthStateType => {
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

export const initializeApp = () =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppIsLoading(true))
        socialNetworkAPI.getMe()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC(res.data.data))
                    dispatch(setIsLoggedInAC(true))
                }
                else {
                    dispatch(setIsLoggedInAC(false))
                }
            })
            .catch(error => {
                dispatch(addAppAlert('failed', error.message))
            })
            .finally(() => dispatch(setAppIsLoading(false)))
            
    }

export const getPhotoUrl = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.getProfile(userId)
    .then(res => {
        dispatch(setPhotoUrlAC(res.data.photos.small))
    })
    .catch(error => {
        dispatch(addAppAlert('failed', error.message))
    })
    .finally(() => dispatch(setAppIsLoading(false)))
}

export const logOut = () => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
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

export const logIn = (loginData: LoginDataType) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.login(loginData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
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