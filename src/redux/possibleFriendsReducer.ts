import { UserResponseType, socialNetworkAPI } from '../api/social-network-api';
import { FriendsType } from './friendsReducer';
import { SetAppRequestStatusActionType, setAppRequestStatusAC } from './appReducer';
import { showGlobalAppStatus } from './utils/setGlobalAppStatus';
import { AppDispatchType } from './redux-store';

const SET_POSSIBLE_FRIENDS = 'SET-POSSIBLE-FRIENDS'
const SET_POSSIBLE_FRIENDS_ON_PAGE = 'SET-POSSIBLE-FRIENDS-ON-PAGE'
const SET_POSSIBLE_FRIENDS_CURRENT_PAGE = 'SET-POSSIBLE-FRIENDS-CURRENT-PAGE'
const SET_TOTAL_POSSIBLE_FRIENDS_COUNT = 'SET-TOTAL-POSSIBLE-FRIENDS-COUNT'

export type FriendsReducerActionsType =
    | ReturnType<typeof setPossibleFriendsAC>
    | ReturnType<typeof setPossibleFriendsCurrentPageAC>
    | ReturnType<typeof setPossibleFriendsOnPageAC>
    | ReturnType<typeof setTotalPossibleFriendsCountAC>
    | SetAppRequestStatusActionType

const initialState: FriendsType = {
    users: [],
    usersOnPage: 4,
    totalUsersCount: 0,
    currentPage: 1,
}

export const possibleFriendsReducer = (state: FriendsType = initialState, action: FriendsReducerActionsType): FriendsType => {
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

export const setPossibleFriendsAC = (possibleFriends: UserResponseType[]) =>
    ({ type: SET_POSSIBLE_FRIENDS, payload: { possibleFriends } }) as const

export const setPossibleFriendsCurrentPageAC = (currentPage: number) =>
    ({ type: SET_POSSIBLE_FRIENDS_CURRENT_PAGE, payload: { currentPage } }) as const

export const setPossibleFriendsOnPageAC = (possibleFriendsOnPage: number) =>
    ({ type: SET_POSSIBLE_FRIENDS_ON_PAGE, payload: { possibleFriendsOnPage } }) as const

export const setTotalPossibleFriendsCountAC = (totalPossibleFriendsCount: number) =>
    ({ type: SET_TOTAL_POSSIBLE_FRIENDS_COUNT, payload: { totalPossibleFriendsCount } }) as const

export const getPossibleFriendsTC = (pageNumber: number, possibleFriendsOnPage: number) =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppRequestStatusAC('loading'))
        socialNetworkAPI.getSortedUsers(pageNumber, possibleFriendsOnPage, false)
            .then(res => {
                dispatch(setTotalPossibleFriendsCountAC(res.data.totalCount))
                dispatch(setPossibleFriendsCurrentPageAC(pageNumber))
                dispatch(setPossibleFriendsOnPageAC(possibleFriendsOnPage))
                dispatch(setPossibleFriendsAC(res.data.items))
                dispatch(setAppRequestStatusAC('succeeded'))
            })
            .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
    }