import { AppRootStateType } from 'store/redux-store'
import { UsersStateType } from './usersReducer'

export const selectUsersData = (state: AppRootStateType): UsersStateType => state.users 
export const selectUsersSearchTerm = (state: AppRootStateType): string => state.users.searchTerm 