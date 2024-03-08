import { AppRootStateType } from 'redux/redux-store'
import { UsersStateType } from './usersReducer'

export const selectUsersData = (state: AppRootStateType): UsersStateType => state.users 