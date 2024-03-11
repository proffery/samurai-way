import { AppRootStateType } from 'store/redux-store'
import { UsersStateType } from './usersReducer'

export const selectUsersData = (state: AppRootStateType): UsersStateType => state.users 