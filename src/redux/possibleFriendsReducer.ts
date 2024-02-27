import { UserResponseType, socialNetworkAPI } from '../api/social-network-api'
import { FriendsType } from './friendsReducer'
import { SetAppIsLoadingActionType, addAppAlert, setAppIsLoading } from './appReducer'
import { AppDispatchType } from './redux-store'
import { CLEAN_REDUCER, CleanReducerType } from './authReducer'

//CONSTANTS
const SET_POSSIBLE_FRIENDS = 'SET-POSSIBLE-FRIENDS'
const SET_POSSIBLE_FRIENDS_ON_PAGE = 'SET-POSSIBLE-FRIENDS-ON-PAGE'
const SET_POSSIBLE_FRIENDS_CURRENT_PAGE = 'SET-POSSIBLE-FRIENDS-CURRENT-PAGE'
const SET_TOTAL_POSSIBLE_FRIENDS_COUNT = 'SET-TOTAL-POSSIBLE-FRIENDS-COUNT'

//INITIAL STATE
const initialState: FriendsType = {
    users: [],
    usersOnPage: 4,
    totalUsersCount: 0,
    currentPage: 1,
}

//REDUCER
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
        case CLEAN_REDUCER:
            return initialState
        default:
            return state
    }
}

//ACTIONS
export const setPossibleFriends = (possibleFriends: UserResponseType[]) =>
    ({ type: SET_POSSIBLE_FRIENDS, payload: { possibleFriends } }) as const
export const setPossibleFriendsCurrentPage = (currentPage: number) =>
    ({ type: SET_POSSIBLE_FRIENDS_CURRENT_PAGE, payload: { currentPage } }) as const
export const setPossibleFriendsOnPage = (possibleFriendsOnPage: number) =>
    ({ type: SET_POSSIBLE_FRIENDS_ON_PAGE, payload: { possibleFriendsOnPage } }) as const
export const setTotalPossibleFriendsCount = (totalPossibleFriendsCount: number) =>
    ({ type: SET_TOTAL_POSSIBLE_FRIENDS_COUNT, payload: { totalPossibleFriendsCount } }) as const

//THUNKS
export const getPossibleFriends = (pageNumber: number, possibleFriendsOnPage: number) =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppIsLoading(true))
        socialNetworkAPI.getSortedUsers(pageNumber, possibleFriendsOnPage, false)
            .then(res => {
                dispatch(setTotalPossibleFriendsCount(res.data.totalCount))
                dispatch(setPossibleFriendsCurrentPage(pageNumber))
                dispatch(setPossibleFriendsOnPage(possibleFriendsOnPage))
                dispatch(setPossibleFriends(res.data.items))
            })
            .catch(error => {
                dispatch(addAppAlert('failed', error.message))
            })
            .finally(() => dispatch(setAppIsLoading(false)))
    }

//TYPES
export type FriendsReducerActionsType =
    | ReturnType<typeof setPossibleFriends>
    | ReturnType<typeof setPossibleFriendsCurrentPage>
    | ReturnType<typeof setPossibleFriendsOnPage>
    | ReturnType<typeof setTotalPossibleFriendsCount>
    | SetAppIsLoadingActionType
    | CleanReducerType