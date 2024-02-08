import { Dispatch } from 'redux';
import { UserStateType, socialNetworkAPI } from '../api/social-network-api';
import { UsersStateType } from './usersReducer';

const SET_FRIENDS = 'SET-FRIENDS'
const SET_FRIENDS_ON_PAGE = 'SET-FRIENDS-ON-PAGE'
const SET_CURRENT_FRIENDS_PAGE = 'SET-CURRENT-FRIENDS--PAGE'
const SET_TOTAL_FRIENDS_COUNT = 'SET-TOTAL-FRIENDS-COUNT'

export type FriendsReducerActionsType =
    | ReturnType<typeof setFriendsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setFriendsOnPageAC>
    | ReturnType<typeof setTotalFriendsCountAC>

const initialState: UsersStateType = {
    users: [],
    usersOnPage: 4,
    totalUsersCount: 0,
    currentPage: 1
}

const friendsReducer = (state: UsersStateType = initialState, action: FriendsReducerActionsType): UsersStateType => {
    switch (action.type) {
        case SET_FRIENDS:
            return { ...state, users: [...action.payload.friends] }
        case SET_CURRENT_FRIENDS_PAGE:
            return { ...state, currentPage: action.payload.currentPage }
        case SET_FRIENDS_ON_PAGE:
            return { ...state, usersOnPage: action.payload.usersOnPage }
        case SET_TOTAL_FRIENDS_COUNT:
            return { ...state, totalUsersCount: action.payload.totalUsersCount }
        default:
            return state
    }
}

export const setFriendsAC = (friends: UserStateType[]) => ({
    type: SET_FRIENDS,
    payload: {
        friends
    }
}) as const

export const setCurrentPageAC = (currentPage: number) => ({
    type: SET_CURRENT_FRIENDS_PAGE,
    payload: {
        currentPage
    }
}) as const

export const setFriendsOnPageAC = (usersOnPage: number) => ({
    type: SET_FRIENDS_ON_PAGE,
    payload: {
        usersOnPage
    }
}) as const

export const setTotalFriendsCountAC = (totalUsersCount: number) => ({
    type: SET_TOTAL_FRIENDS_COUNT,
    payload: {
        totalUsersCount
    }
}) as const

export const getFriendsTC = (pageNumber: number, usersOnPage: number) => (dispatch: Dispatch<FriendsReducerActionsType>) => {
    socialNetworkAPI.getFriends(pageNumber, usersOnPage)
        .then(res => {
            dispatch(setTotalFriendsCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setFriendsOnPageAC(usersOnPage))
            dispatch(setFriendsAC(res.data.items))
        })
}

export default friendsReducer