import { AppRootStateType } from 'redux/redux-store'
import { FriendsType } from './friendsReducer'

export const selectPossibleFriendsData = (state: AppRootStateType): FriendsType => state.friends.possibleFriends
export const selectFriendsData = (state: AppRootStateType): FriendsType => state.friends.friends