import { Dispatch } from "redux"
import { UserStateType, socialNetworkAPI } from "../api/social-network-api"
import { SetAppRequestStatusActionsType, setAppRequestStatusAC } from "./appReducer"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_USERS_ON_PAGE = 'SET-USERS-ON-PAGE'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const CHANGE_USERS_FILTER = 'CHANGE-USERS-FILTER'

export type UsersReducerActionsType =
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersOnPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof changeUsersFilterAC>
    | SetAppRequestStatusActionsType

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

const usersReducer = (state: UsersStateType = initialState, action: UsersReducerActionsType): UsersStateType => {
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
            return { ...state, users: [...action.payload.users] }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload.currentPage }
        case SET_USERS_ON_PAGE:
            return { ...state, usersOnPage: action.payload.usersOnPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.payload.totalUsersCount }
        case CHANGE_USERS_FILTER:
            return {...state, usersFilter: action.payload.usersFilter}
        default:
            return state
    }
}

export const followAC = (userId: number) => ({
    type: FOLLOW,
    payload: {
        userId
    }
}) as const

export const unfollowAC = (userId: number) => ({
    type: UNFOLLOW,
    payload: {
        userId
    }
}) as const

export const setUsersAC = (users: UserStateType[]) => ({
    type: SET_USERS,
    payload: {
        users
    }
}) as const

export const setCurrentPageAC = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    payload: {
        currentPage
    }
}) as const

export const setUsersOnPageAC = (usersOnPage: number) => ({
    type: SET_USERS_ON_PAGE,
    payload: {
        usersOnPage
    }
}) as const

export const setTotalUsersCountAC = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    payload: {
        totalUsersCount
    }
}) as const

export const changeUsersFilterAC = (usersFilter: UsersFilterType) => ({
    type: CHANGE_USERS_FILTER,
    payload: {
        usersFilter
    }
}) as const

export const getAllUsersTC = (pageNumber: number, usersOnPage: number) => (dispatch: Dispatch<UsersReducerActionsType>) => {
        dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.getUsers(pageNumber, usersOnPage)
        .then(res => {
            dispatch(setTotalUsersCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setUsersOnPageAC(usersOnPage))
            dispatch(setUsersAC(res.data.items))
            dispatch(setAppRequestStatusAC('succeeded'))
        })
}

export const getFollowedUsersTC = (pageNumber: number, usersOnPage: number) => (dispatch: Dispatch<UsersReducerActionsType>) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.getFriends(pageNumber, usersOnPage)
        .then(res => {
            dispatch(setTotalUsersCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setUsersOnPageAC(usersOnPage))
            dispatch(setUsersAC(res.data.items))
            dispatch(setAppRequestStatusAC('succeeded'))
        })
}

export const getUnfollowedUsersTC = (pageNumber: number, usersOnPage: number) => (dispatch: Dispatch<UsersReducerActionsType>) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.getPossibleFriends(pageNumber, usersOnPage)
        .then(res => {
            dispatch(setTotalUsersCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setUsersOnPageAC(usersOnPage))
            dispatch(setUsersAC(res.data.items))
            dispatch(setAppRequestStatusAC('succeeded'))
        })
}

export const followUsersTC = (userId: number) => (dispatch: Dispatch<UsersReducerActionsType>) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.followUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(followAC(userId))
                dispatch(setAppRequestStatusAC('succeeded'))
            }
            else {
                console.warn(res.data.messages)
            }
        })
}

export const unfollowUsersTC = (userId: number) => (dispatch: Dispatch<UsersReducerActionsType>) => {
    dispatch(setAppRequestStatusAC('loading'))
    socialNetworkAPI.unfollowUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(unfollowAC(userId))
                dispatch(setAppRequestStatusAC('succeeded'))
            }
            else {
                console.warn(res.data.messages)
            }
        })
}

export default usersReducer