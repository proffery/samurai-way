import { Dispatch } from "redux"
import { socialNetworkAPI } from "../api/social-network-api"

export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'
export const SET_USERS = 'SET-USERS'

export type UsersReducerActionsType = FollowACType | UnfollowACType | SetUsersACType
export type UsersReducerThunksType = GetUsersTCType | FollowUsersTCType | UnfollowUsersTCType

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

const usersReducer = (state: UserStateType[] = initialState, action: UsersReducerActionsType) => {
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


type FollowACType = ReturnType<typeof followAC>
export const followAC = (userId: number) => {
    return {
        type: FOLLOW,
        payload: {
            userId
        }
    } as const
}

type UnfollowACType = ReturnType<typeof unfollowAC>
export const unfollowAC = (userId: number) => {
    return {
        type: UNFOLLOW,
        payload: {
            userId
        }
    } as const
}

type SetUsersACType = ReturnType<typeof setUsersAC>
export const setUsersAC = (users: UserStateType[]) => {
    return {
        type: SET_USERS,
        payload: {
            users
        }
    } as const
}


type GetUsersTCType = ReturnType<typeof getUsersTC>
export const getUsersTC = () => {
    return (dispatch: Dispatch) => {
        socialNetworkAPI.getUsers()
            .then(res => {
                const users = res.data.items
                dispatch(setUsersAC(users))
            })
    }
}

type FollowUsersTCType = ReturnType<typeof followUsersTC>
export const followUsersTC = (userId: number) => {
    return (dispatch: Dispatch) => {
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
}

type UnfollowUsersTCType = ReturnType<typeof unfollowUsersTC>
export const unfollowUsersTC = (userId: number) => {
    return (dispatch: Dispatch) => {
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
}

export default usersReducer