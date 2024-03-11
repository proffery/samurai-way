import { AuthStateType } from 'store/auth/authReducer'
import { AppRootStateType } from 'store/redux-store'

export const selectIsloggedIn = (state: AppRootStateType): boolean => state.auth.isLoggedIn
export const selectAuthData = (state: AppRootStateType): AuthStateType => state.auth