import { UserResponseType } from 'api/social-network-api'
import { AppRootStateType } from 'store/redux-store'

export const selectPossibleFriends = (state: AppRootStateType): UserResponseType[] => state.friends.possibleFriends.users
export const selectTotalPossibleFriendsCount = (state: AppRootStateType): number => state.friends.possibleFriends.totalUsersCount
export const selectPossibleFriendsOnPage = (state: AppRootStateType): number => state.friends.possibleFriends.usersOnPage
export const selectPossibleFriendsCurrentPage = (state: AppRootStateType): number => state.friends.possibleFriends.currentPage
export const selectFriends = (state: AppRootStateType): UserResponseType[] => state.friends.friends.users
export const selectTotalFriendsCount = (state: AppRootStateType): number => state.friends.friends.totalUsersCount
export const selectFriendsOnPage = (state: AppRootStateType): number => state.friends.friends.usersOnPage
export const selectFriendsCurrentPage = (state: AppRootStateType): number => state.friends.friends.currentPage