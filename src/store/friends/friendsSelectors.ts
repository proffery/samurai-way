import { UserResponse } from 'api/usersAPI'
import { AppRootState } from 'store/redux-store'

export const selectPossibleFriendsData = (state: AppRootState) => state.friends.possibleFriends
export const selectPossibleFriends = (state: AppRootState): UserResponse[] => state.friends.possibleFriends.users
export const selectTotalPossibleFriendsCount = (state: AppRootState): number => state.friends.possibleFriends.totalUsersCount
export const selectPossibleFriendsOnPage = (state: AppRootState): number => state.friends.possibleFriends.usersOnPage
export const selectPossibleFriendsCurrentPage = (state: AppRootState): number => state.friends.possibleFriends.currentPage
export const selectFriendsData = (state: AppRootState) => state.friends.friends
export const selectFriends = (state: AppRootState): UserResponse[] => state.friends.friends.users
export const selectFriendsOnPage = (state: AppRootState): number => state.friends.friends.usersOnPage
export const selectTotalFriendsCount = (state: AppRootState): number => state.friends.friends.totalUsersCount
export const selectFriendsCurrentPage = (state: AppRootState): number => state.friends.friends.currentPage