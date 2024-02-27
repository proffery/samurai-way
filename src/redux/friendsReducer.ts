import { UserResponseType, socialNetworkAPI } from '../api/social-network-api'
import { SetAppIsLoadingActionType, addAppAlert, setAppIsLoading } from './appReducer'
import { CLEAN_REDUCER, CleanReducerType } from './authReducer'
import { AppDispatchType } from './redux-store'

//CONSTANTS
const SET_FRIENDS = 'SET-FRIENDS'
const SET_FRIENDS_ON_PAGE = 'SET-FRIENDS-ON-PAGE'
const SET_CURRENT_FRIENDS_PAGE = 'SET-CURRENT-FRIENDS--PAGE'
const SET_TOTAL_FRIENDS_COUNT = 'SET-TOTAL-FRIENDS-COUNT'

//INITIAL STATE
const initialState: FriendsType = {
    users: [],
    usersOnPage: 4,
    totalUsersCount: 0,
    currentPage: 1,
}

//REDUCER
export const friendsReducer = (state: FriendsType = initialState, action: FriendsReducerActionsType): FriendsType => {
    switch (action.type) {
        case SET_FRIENDS:
            return { ...state, users: [...action.payload.friends] }
        case SET_CURRENT_FRIENDS_PAGE:
            return { ...state, currentPage: action.payload.currentPage }
        case SET_FRIENDS_ON_PAGE:
            return { ...state, usersOnPage: action.payload.usersOnPage }
        case SET_TOTAL_FRIENDS_COUNT:
            return { ...state, totalUsersCount: action.payload.totalUsersCount }
        case CLEAN_REDUCER:
            return initialState
        default:
            return state
    }
}

//ACTIONS
export const setFriends = (friends: UserResponseType[]) =>
    ({ type: SET_FRIENDS, payload: { friends } }) as const
export const setCurrentPage = (currentPage: number) =>
    ({ type: SET_CURRENT_FRIENDS_PAGE, payload: { currentPage } }) as const
export const setFriendsOnPage = (usersOnPage: number) =>
    ({ type: SET_FRIENDS_ON_PAGE, payload: { usersOnPage } }) as const
export const setTotalFriendsCount = (totalUsersCount: number) =>
    ({ type: SET_TOTAL_FRIENDS_COUNT, payload: { totalUsersCount } }) as const

//THUNKS
export const getFriends = (pageNumber: number, usersOnPage: number) =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppIsLoading(true))
        socialNetworkAPI.getSortedUsers(pageNumber, usersOnPage, true)
            .then(res => {
                dispatch(setTotalFriendsCount(res.data.totalCount))
                dispatch(setCurrentPage(pageNumber))
                dispatch(setFriendsOnPage(usersOnPage))
                dispatch(setFriends(res.data.items))
            })
            .catch(error => {
                dispatch(addAppAlert('failed', error.message))
            })
            .finally(() => dispatch(setAppIsLoading(false)))
    }

//TYPES
export type FriendsReducerActionsType =
    | ReturnType<typeof setFriends>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setFriendsOnPage>
    | ReturnType<typeof setTotalFriendsCount>
    | SetAppIsLoadingActionType
    | CleanReducerType
export type FriendsType = {
    users: UserResponseType[],
    usersOnPage: number,
    totalUsersCount: number,
    currentPage: number,
}