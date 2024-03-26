import { UserResponse } from 'api/usersAPI'
import { AppRootStateType } from 'store/redux-store'

export const selectPossibleFriendsData = (state: AppRootStateType) => state.friends.possibleFriends
export const selectPossibleFriends = (state: AppRootStateType): UserResponse[] => state.friends.possibleFriends.users
export const selectTotalPossibleFriendsCount = (state: AppRootStateType): number => state.friends.possibleFriends.totalUsersCount
export const selectPossibleFriendsOnPage = (state: AppRootStateType): number => state.friends.possibleFriends.usersOnPage
export const selectPossibleFriendsCurrentPage = (state: AppRootStateType): number => state.friends.possibleFriends.currentPage
export const selectFriendsData = (state: AppRootStateType) => state.friends.friends
export const selectFriends = (state: AppRootStateType): UserResponse[] => state.friends.friends.users
export const selectFriendsOnPage = (state: AppRootStateType): number => state.friends.friends.usersOnPage
export const selectTotalFriendsCount = (state: AppRootStateType): number => state.friends.friends.totalUsersCount
export const selectFriendsCurrentPage = (state: AppRootStateType): number => state.friends.friends.currentPage