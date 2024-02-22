import { UserResponseType, socialNetworkAPI } from "../api/social-network-api"
import { SetAlertMessageActionType, SetAppIsLoadingActionType, setAppAlertMessageAC, setAppIsLoading } from "./appReducer"
import { AppDispatchType } from "./redux-store"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_USERS_ON_PAGE = 'SET-USERS-ON-PAGE'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const CHANGE_USERS_FILTER = 'CHANGE-USERS-FILTER'
const CHANGE_USER_IS_LOADING = 'CHANGE-USER-IS-LOADING'


export type UsersReducerActionsType =
    | FollowUserActionType
    | UnfollowUserActionType
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersOnPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof changeUsersFilterAC>
    | ReturnType<typeof changeUsersIsLoading>
    | SetAppIsLoadingActionType
    | SetAlertMessageActionType

export type FollowUserActionType = ReturnType<typeof followAC>
export type UnfollowUserActionType = ReturnType<typeof unfollowAC>


export interface UserStateType extends UserResponseType {
    isLoading: boolean
}

export type UsersStateType = {
    users: UserStateType[]
    usersOnPage: number
    totalUsersCount: number
    currentPage: number
    usersFilter: UsersFilterType
}

export type UsersFilterType = 'all' | 'followed' | 'unfollowed'

const initialState: UsersStateType = {
    users: [],
    usersOnPage: 15,
    totalUsersCount: 0,
    currentPage: 1,
    usersFilter: 'all'
}

export const usersReducer = (state: UsersStateType = initialState, action: UsersReducerActionsType): UsersStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map(user => user.id === action.payload.userId
                    ? { ...user, followed: true }
                    : user)
            }
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(user => user.id === action.payload.userId
                    ? { ...user, followed: false }
                    : user)
            }
        case SET_USERS:
            return { ...state, users: action.payload.users.map(user => ({ ...user, isLoading: false })) }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload.currentPage }
        case SET_USERS_ON_PAGE:
            return { ...state, usersOnPage: action.payload.usersOnPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.payload.totalUsersCount }
        case CHANGE_USERS_FILTER:
            return { ...state, usersFilter: action.payload.usersFilter }
        case CHANGE_USER_IS_LOADING:
            return {
                ...state, users: state.users.map(user => user.id === action.payload.userId
                    ? { ...user, isLoading: action.payload.isLoading }
                    : user)
            }
        default:
            return state
    }
}

export const followAC = (userId: number) =>
    ({ type: FOLLOW, payload: { userId } }) as const

export const unfollowAC = (userId: number) =>
    ({ type: UNFOLLOW, payload: { userId } }) as const

export const setUsersAC = (users: UserResponseType[]) =>
    ({ type: SET_USERS, payload: { users } }) as const

export const setCurrentPageAC = (currentPage: number) =>
    ({ type: SET_CURRENT_PAGE, payload: { currentPage } }) as const

export const setUsersOnPageAC = (usersOnPage: number) =>
    ({ type: SET_USERS_ON_PAGE, payload: { usersOnPage } }) as const

export const setTotalUsersCountAC = (totalUsersCount: number) =>
    ({ type: SET_TOTAL_USERS_COUNT, payload: { totalUsersCount } }) as const

export const changeUsersFilterAC = (usersFilter: UsersFilterType) =>
    ({ type: CHANGE_USERS_FILTER, payload: { usersFilter } }) as const

export const changeUsersIsLoading = (userId: number, isLoading: boolean) =>
    ({ type: CHANGE_USER_IS_LOADING, payload: { userId, isLoading } }) as const

export const getAllUsersTC = (pageNumber: number, usersOnPage: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.getUsers(pageNumber, usersOnPage)
        .then(res => {
            dispatch(setTotalUsersCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setUsersOnPageAC(usersOnPage))
            dispatch(setUsersAC(res.data.items))
        })
        .catch(error => {
            dispatch(setAppAlertMessageAC(error.message))
        })
        .finally(() => dispatch(setAppIsLoading(false)))
}

export const getFollowedUsersTC = (pageNumber: number, usersOnPage: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.getSortedUsers(pageNumber, usersOnPage, true)
        .then(res => {
            dispatch(setTotalUsersCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setUsersOnPageAC(usersOnPage))
            dispatch(setUsersAC(res.data.items))
        })
        .catch(error => {
            dispatch(setAppAlertMessageAC(error.message))
        })
        .finally(() => dispatch(setAppIsLoading(false)))
}

export const getUnfollowedUsersTC = (pageNumber: number, usersOnPage: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.getSortedUsers(pageNumber, usersOnPage, false)
        .then(res => {
            dispatch(setTotalUsersCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setUsersOnPageAC(usersOnPage))
            dispatch(setUsersAC(res.data.items))
        })
        .catch(error => {
            dispatch(setAppAlertMessageAC(error.message))
        })
        .finally(() => dispatch(setAppIsLoading(false)))
}

export const followUsersTC = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(changeUsersIsLoading(userId, true))
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.followUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(followAC(userId))
                dispatch(setAppAlertMessageAC('Followed!'))
            }
            else {
                dispatch(setAppAlertMessageAC(res.data.messages[0]))
            }
        })
        .catch(error => {
            dispatch(setAppAlertMessageAC(error.message))
        })
        .finally(() => {
            dispatch(setAppIsLoading(false))
            dispatch(changeUsersIsLoading(userId, false))
        })
}

export const unfollowUsersTC = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(changeUsersIsLoading(userId, true))
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.unfollowUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(unfollowAC(userId))
                dispatch(setAppAlertMessageAC('Unfollowed!'))
            }
            else {
                dispatch(setAppAlertMessageAC(res.data.messages[0]))
            }
        })
        .catch(error => {
            dispatch(setAppAlertMessageAC(error.message))
        })
        .finally(() => {
            dispatch(setAppIsLoading(false))
            dispatch(changeUsersIsLoading(userId, false))
        })
}