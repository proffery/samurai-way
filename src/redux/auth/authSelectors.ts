import { AppRootStateType } from 'redux/redux-store'
import { AuthStateType } from './authReducer'

export const selectIsloggedIn = (state: AppRootStateType): boolean => state.auth.isLoggedIn
export const selectAuthData = (state: AppRootStateType): AuthStateType => state.auth