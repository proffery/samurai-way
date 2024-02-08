import { Dispatch } from 'redux';
import { UserStateType, socialNetworkAPI } from '../api/social-network-api';
import { UsersStateType } from './usersReducer';

const SET_POSSIBLE_FRIENDS = 'SET-POSSIBLE-FRIENDS'
const SET_POSSIBLE_FRIENDS_ON_PAGE = 'SET-POSSIBLE-FRIENDS-ON-PAGE'
const SET_POSSIBLE_FRIENDS_CURRENT_PAGE = 'SET-POSSIBLE-FRIENDS-CURRENT-PAGE'
const SET_TOTAL_POSSIBLE_FRIENDS_COUNT = 'SET-TOTAL-POSSIBLE-FRIENDS-COUNT'

export type FriendsReducerActionsType =
    | ReturnType<typeof setPossibleFriendsAC>
    | ReturnType<typeof setPossibleFriendsCurrentPageAC>
    | ReturnType<typeof setPossibleFriendsOnPageAC>
    | ReturnType<typeof setTotalPossibleFriendsCountAC>

const initialState: UsersStateType = {
    users: [],
    usersOnPage: 5,
    totalUsersCount: 0,
    currentPage: 1
}

const possibleFriendsReducer = (state: UsersStateType = initialState, action: FriendsReducerActionsType): UsersStateType => {
    switch (action.type) {
        case SET_POSSIBLE_FRIENDS:
            return { ...state, users: [...action.payload.possibleFriends] }
        case SET_POSSIBLE_FRIENDS_CURRENT_PAGE:
            return { ...state, currentPage: action.payload.currentPage }
        case SET_POSSIBLE_FRIENDS_ON_PAGE:
            return { ...state, usersOnPage: action.payload.possibleFriendsOnPage }
        case SET_TOTAL_POSSIBLE_FRIENDS_COUNT:
            return { ...state, totalUsersCount: action.payload.totalPossibleFriendsCount }
        default:
            return state
    }
}

export const setPossibleFriendsAC = (possibleFriends: UserStateType[]) => ({
    type: SET_POSSIBLE_FRIENDS,
    payload: {
        possibleFriends
    }
}) as const

export const setPossibleFriendsCurrentPageAC = (currentPage: number) => ({
    type: SET_POSSIBLE_FRIENDS_CURRENT_PAGE,
    payload: {
        currentPage
    }
}) as const

export const setPossibleFriendsOnPageAC = (possibleFriendsOnPage: number) => ({
    type: SET_POSSIBLE_FRIENDS_ON_PAGE,
    payload: {
        possibleFriendsOnPage
    }
}) as const

export const setTotalPossibleFriendsCountAC = (totalPossibleFriendsCount: number) => ({
    type: SET_TOTAL_POSSIBLE_FRIENDS_COUNT,
    payload: {
        totalPossibleFriendsCount
    }
}) as const

export const getPossibleFriendsTC = (pageNumber: number, possibleFriendsOnPage: number) => (dispatch: Dispatch<FriendsReducerActionsType>) => {
    socialNetworkAPI.getPossibleFriends(pageNumber, possibleFriendsOnPage)
        .then(res => {
            dispatch(setTotalPossibleFriendsCountAC(res.data.totalCount))
            dispatch(setPossibleFriendsCurrentPageAC(pageNumber))
            dispatch(setPossibleFriendsOnPageAC(possibleFriendsOnPage))
            dispatch(setPossibleFriendsAC(res.data.items))
        })
}
export default possibleFriendsReducer