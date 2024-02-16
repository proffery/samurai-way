import { UserResponseType, socialNetworkAPI } from "../api/social-network-api"
import { RequestStatusType, SetAlertMessageActionType, SetAppRequestStatusActionType, setAppRequestStatusAC } from "./appReducer"
import { showGlobalAppStatus } from "./utils/setGlobalAppStatus"
import { AppDispatchType } from "./redux-store"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_USERS_ON_PAGE = 'SET-USERS-ON-PAGE'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const CHANGE_USERS_FILTER = 'CHANGE-USERS-FILTER'
const CHANGE_USER_REQUEST_STATUS = 'CHANGE-USER-REQUEST-STATUS'


export type UsersReducerActionsType =
    | FollowUserActionType
    | UnfollowUserActionType
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersOnPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof changeUsersFilterAC>
    | ReturnType<typeof changeUsersRequestStatusAC>
    | SetAppRequestStatusActionType
    | SetAlertMessageActionType

export type FollowUserActionType = ReturnType<typeof followAC>
export type UnfollowUserActionType = ReturnType<typeof unfollowAC>


export interface UserStateType extends UserResponseType {
    requestStatus: RequestStatusType
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
            return { ...state, users: action.payload.users.map(user => ({ ...user, requestStatus: null })) }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload.currentPage }
        case SET_USERS_ON_PAGE:
            return { ...state, usersOnPage: action.payload.usersOnPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.payload.totalUsersCount }
        case CHANGE_USERS_FILTER:
            return { ...state, usersFilter: action.payload.usersFilter }
        case CHANGE_USER_REQUEST_STATUS:
            return {
                ...state, users: state.users.map(user => user.id === action.payload.userId
                    ? { ...user, requestStatus: action.payload.requestStatus }
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

export const changeUsersRequestStatusAC = (userId: number, requestStatus: RequestStatusType) =>
    ({ type: CHANGE_USER_REQUEST_STATUS, payload: { userId, requestStatus } }) as const

export const getAllUsersTC = (pageNumber: number, usersOnPage: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.getUsers(pageNumber, usersOnPage)
        .then(res => {
            dispatch(setTotalUsersCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setUsersOnPageAC(usersOnPage))
            dispatch(setUsersAC(res.data.items))
            dispatch(setAppRequestStatusAC('succeeded'))
        })
        .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
}

export const getFollowedUsersTC = (pageNumber: number, usersOnPage: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.getSortedUsers(pageNumber, usersOnPage, true)
        .then(res => {
            dispatch(setTotalUsersCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setUsersOnPageAC(usersOnPage))
            dispatch(setUsersAC(res.data.items))
            dispatch(setAppRequestStatusAC('succeeded'))
        })
        .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
}

export const getUnfollowedUsersTC = (pageNumber: number, usersOnPage: number) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.getSortedUsers(pageNumber, usersOnPage, false)
        .then(res => {
            dispatch(setTotalUsersCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setUsersOnPageAC(usersOnPage))
            dispatch(setUsersAC(res.data.items))
            dispatch(setAppRequestStatusAC('succeeded'))
        })
        .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
}

export const followUsersTC = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(changeUsersRequestStatusAC(userId, 'loading'))
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.followUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(followAC(userId))
                dispatch(changeUsersRequestStatusAC(userId, 'succeeded'))
                showGlobalAppStatus(dispatch, 'succeeded', 'Followed!')
            }
            else {
                showGlobalAppStatus(dispatch, 'failed', res.data.messages[0])
            }
        })
        .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
}

export const unfollowUsersTC = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(changeUsersRequestStatusAC(userId, 'loading'))
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.unfollowUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(unfollowAC(userId))
                dispatch(changeUsersRequestStatusAC(userId, 'succeeded'))
                showGlobalAppStatus(dispatch, 'succeeded', 'Unfollowed!')
            }
            else {
                showGlobalAppStatus(dispatch, 'failed', res.data.messages[0])
            }
        })
        .catch(error => showGlobalAppStatus(dispatch, 'failed', error.message))
}