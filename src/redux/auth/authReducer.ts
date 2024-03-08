import { GetMeDataType, LoginDataType, socialNetworkAPI } from '../../api/social-network-api'
import { SetAppIsInitializedType, SetAppIsLoadingActionType, addAppAlert, initializeApp, setAppIsLoading } from '../app/appReducer'
import { AppDispatchType } from '../redux-store'

//CONSTANTS
const SET_AUTH_DATA = 'AUTH/SET-AUTH-DATA'
const SET_IS_LOGGED_IN = 'AUTH/SET-IS-LOGGED-IN'
const SET_PHOTO_URL = 'AUTH/SET-PHOTO-URL'
export const CLEAN_REDUCER = 'AUTH/CLEAN-REDUCER'

//INITIAL STATE
const initialState: AuthStateType = {
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
        case CLEAN_REDUCER:
            return initialState
        default:
            return state
    }
}

//ACTIONS
export type CleanReducerType = ReturnType<typeof cleanReducer>
export const setAuthUserData = (data: GetMeDataType) =>
    ({ type: SET_AUTH_DATA, payload: { data } }) as const
export const setIsLoggedIn = (value: boolean) =>
    ({ type: SET_IS_LOGGED_IN, payload: { value } }) as const
export const setPhotoUrl = (photoUrl: string) =>
    ({ type: SET_PHOTO_URL, payload: { photoUrl } }) as const
export const cleanReducer = () =>
    ({ type: CLEAN_REDUCER }) as const

//THUNKS

export const getAuthPhoto = (authId: number) => (dispatch: AppDispatchType) => {
    return socialNetworkAPI.getProfile(authId)
        .then(res => {
            dispatch(setPhotoUrl(res.data.photos.small))
        })
}

export const logIn = (loginData: LoginDataType) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    return socialNetworkAPI.login(loginData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(initializeApp())
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

export const logOut = () => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(cleanReducer())
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
export type AuthReducerActionsType =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setPhotoUrl>
    | SetAppIsLoadingActionType
    | SetAppIsInitializedType
    | CleanReducerType
export interface AuthStateType extends GetMeDataType {
    isLoggedIn: boolean
    photoUrl: string
}
