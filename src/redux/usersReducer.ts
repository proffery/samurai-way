import { Dispatch } from "redux"
import { UserStateType, socialNetworkAPI } from "../api/social-network-api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_USERS_ON_PAGE = 'SET-USERS-ON-PAGE'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'

export type UsersReducerActionsType =
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersOnPageAC>
    | ReturnType<typeof setTotalUsersCountAC>

export type UsersStateType = {
    users: UserStateType[]
    usersOnPage: number
    totalUsersCount: number
    currentPage: number
}

const initialState: UsersStateType = {
    users: [],
    usersOnPage: 15,
    totalUsersCount: 0,
    currentPage: 1
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

export const getUsersTC = (pageNumber: number, usersOnPage: number) => (dispatch: Dispatch<UsersReducerActionsType>) => {
    socialNetworkAPI.getUsers(pageNumber, usersOnPage)
        .then(res => {
            dispatch(setTotalUsersCountAC(res.data.totalCount))
            dispatch(setCurrentPageAC(pageNumber))
            dispatch(setUsersOnPageAC(usersOnPage))
            dispatch(setUsersAC(res.data.items))
        })
}

export const followUsersTC = (userId: number) => (dispatch: Dispatch<UsersReducerActionsType>) => {
    socialNetworkAPI.followUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(followAC(userId))
            }
            else {
                console.warn(res.data.messages)
            }
        })
}

export const unfollowUsersTC = (userId: number) => (dispatch: Dispatch<UsersReducerActionsType>) => {
    socialNetworkAPI.unfollowUser(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(unfollowAC(userId))
            }
            else {
                console.warn(res.data.messages)
            }
        })
}

export default usersReducer