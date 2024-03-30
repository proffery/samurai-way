import { AppRootState } from "store/redux-store"
import { UsersState } from "./usersReducer"

export const selectUsersData = (state: AppRootState): UsersState => state.users
export const selectUsersSearchTerm = (state: AppRootState): string => state.users.searchTerm
