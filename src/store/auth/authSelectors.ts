import { AuthState } from 'store/auth/authReducer'
import { AppRootState } from 'store/redux-store'

export const selectIsloggedIn = (state: AppRootState): boolean => state.auth.isLoggedIn
export const selectAuthData = (state: AppRootState): AuthState => state.auth