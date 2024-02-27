import { UserResponseType, socialNetworkAPI } from "../api/social-network-api"
import { AddAlertActionType, SetAppIsLoadingActionType, addAppAlert, setAppIsLoading } from "./appReducer"
import { CLEAN_REDUCER, CleanReducerType } from "./authReducer"
import { AppDispatchType } from "./redux-store"

//CONSTANTS
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_USERS_ON_PAGE = 'SET-USERS-ON-PAGE'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const CHANGE_USERS_FILTER = 'CHANGE-USERS-FILTER'
const CHANGE_USER_IS_LOADING = 'CHANGE-USER-IS-LOADING'

//INITIAL STATE
const initialState: UsersStateType = {
    users: [],
    usersOnPage: 15,
    totalUsersCount: 0,
    currentPage: 1,
    usersFilter: 'all'
}

//REDUCER
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
        case CLEAN_REDUCER:
            return initialState
        default:
            return state
    }
}

//ACTIONS
export const setFollowUser = (userId: number) =>
    ({ type: FOLLOW, payload: { userId } }) as const
export const setUnfollowUser = (userId: number) =>
    ({ type: UNFOLLOW, payload: { userId } }) as const
export const setUsers = (users: UserResponseType[]) =>
    ({ type: SET_USERS, payload: { users } }) as const
export const setCurrentPage = (currentPage: number) =>
    ({ type: SET_CURRENT_PAGE, payload: { currentPage } }) as const
export const setUsersOnPage = (usersOnPage: number) =>
    ({ type: SET_USERS_ON_PAGE, payload: { usersOnPage } }) as const
export const setTotalUsersCount = (totalUsersCount: number) =>
    ({ type: SET_TOTAL_USERS_COUNT, payload: { totalUsersCount } }) as const
export const changeUsersFilter = (usersFilter: UsersFilterType) =>
    ({ type: CHANGE_USERS_FILTER, payload: { usersFilter } }) as const
export const changeUserIsLoading = (userId: number, isLoading: boolean) =>
    ({ type: CHANGE_USER_IS_LOADING, payload: { userId, isLoading } }) as const

//THUNKS
export const getAllUsers = (pageNumber: number, usersOnPage: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.getUsers(pageNumber, usersOnPage)
        .then(res => {
            dispatch(setTotalUsersCount(res.data.totalCount))
            dispatch(setCurrentPage(pageNumber))
            dispatch(setUsersOnPage(usersOnPage))
            dispatch(setUsers(res.data.items))
        })
        .catch(error => {
            dispatch(addAppAlert('failed', error.message))
        })
        .finally(() => dispatch(setAppIsLoading(false)))
}
export const getFollowedUsers = (pageNumber: number, usersOnPage: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.getSortedUsers(pageNumber, usersOnPage, true)
        .then(res => {
            dispatch(setTotalUsersCount(res.data.totalCount))
            dispatch(setCurrentPage(pageNumber))
            dispatch(setUsersOnPage(usersOnPage))
            dispatch(setUsers(res.data.items))
        })
        .catch(error => {
            dispatch(addAppAlert('failed', error.message))
        })
        .finally(() => dispatch(setAppIsLoading(false)))
}
export const getUnfollowedUsers = (pageNumber: number, usersOnPage: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.getSortedUsers(pageNumber, usersOnPage, false)
        .then(res => {
            dispatch(setTotalUsersCount(res.data.totalCount))
            dispatch(setCurrentPage(pageNumber))
            dispatch(setUsersOnPage(usersOnPage))
            dispatch(setUsers(res.data.items))
        })
        .catch(error => {
            dispatch(addAppAlert('failed', error.message))
        })
        .finally(() => dispatch(setAppIsLoading(false)))
}
export const followUser = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(changeUserIsLoading(userId, true))
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.followUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setFollowUser(userId))
                dispatch(addAppAlert('succeeded', 'Followed!'))
            }
            else {
                dispatch(addAppAlert('failed', res.data.messages[0]))
            }
        })
        .catch(error => {
            dispatch(addAppAlert('failed', error.message))
        })
        .finally(() => {
            dispatch(setAppIsLoading(false))
            dispatch(changeUserIsLoading(userId, false))
        })
}
export const unfollowUser = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(changeUserIsLoading(userId, true))
    dispatch(setAppIsLoading(true))
    socialNetworkAPI.unfollowUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setUnfollowUser(userId))
                dispatch(addAppAlert('succeeded', 'Unfollowed!'))
            }
            else {
                dispatch(addAppAlert('failed', res.data.messages[0]))
            }
        })
        .catch(error => {
            dispatch(addAppAlert('failed', error.message))
        })
        .finally(() => {
            dispatch(setAppIsLoading(false))
            dispatch(changeUserIsLoading(userId, false))
        })
}

//TYPES
export type UsersReducerActionsType =
    | FollowUserActionType
    | UnfollowUserActionType
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersOnPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof changeUsersFilter>
    | ReturnType<typeof changeUserIsLoading>
    | SetAppIsLoadingActionType
    | AddAlertActionType
    | CleanReducerType
export type FollowUserActionType = ReturnType<typeof setFollowUser>
export type UnfollowUserActionType = ReturnType<typeof setUnfollowUser>
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