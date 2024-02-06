import { Dispatch } from "redux"
import { socialNetworkAPI } from "../api/social-network-api"

export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'
export const SET_USERS = 'SET-USERS'

export type UsersReducerActionsType =
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>

export type UsersReducerThunksCreatorsType =
    | typeof getUsersTC
    | typeof followUsersTC
    | typeof unfollowUsersTC

export type UsersReducerThunksType =
    | ReturnType<typeof getUsersTC>
    | ReturnType<typeof followUsersTC>
    | ReturnType<typeof unfollowUsersTC>

export type UserStateType = {
    id: number
    followed: boolean
    name: string
    photos: {
        small: string,
        large: string
    }
    status: string
    uniqueUrlName: string
}

const initialState: UserStateType[] = []

const usersReducer = (state: UserStateType[] = initialState, action: UsersReducerActionsType): UserStateType[] => {
    switch (action.type) {
        case FOLLOW:
            return state.map(user => user.id === action.payload.userId
                ? { ...user, followed: true }
                : user
            )
        case UNFOLLOW:
            return state.map(user => user.id === action.payload.userId
                ? { ...user, followed: false }
                : user
            )
        case SET_USERS:
            return [...action.payload.users]
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

export const getUsersTC = () => (dispatch: Dispatch<UsersReducerActionsType>) => {
    socialNetworkAPI.getUsers()
        .then(res => {
            const users = res.data.items
            dispatch(setUsersAC(users))
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