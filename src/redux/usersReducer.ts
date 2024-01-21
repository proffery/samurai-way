export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'
export const SET_USERS = 'SET-USERS'

export type UsersReducerActionsType = FollowACType | UnfollowACType | SetUsersACType

export type UserStateType = {
    id: string
    fullName: string
    photoUrl: string
    status: string
    location: { city: string, country: string }
    isFollowed: boolean
}

const initialState: UserStateType[] = []

const usersReducer = (state: UserStateType[] = initialState, action: UsersReducerActionsType) => {
    switch (action.type) {
        case FOLLOW:
            return state.map(user => user.id === action.payload.userId
                ? { ...user, isFollowed: true }
                : user
            )
        case UNFOLLOW:
            return state.map(user => user.id === action.payload.userId
                ? { ...user, isFollowed: false }
                : user
            )
        case SET_USERS: 
        return [...state, ...action.payload.users]
        default:
            return state
    }
}


type FollowACType = ReturnType<typeof followAC>
export const followAC = (userId: string) => {
    return {
        type: FOLLOW,
        payload: {
            userId
        }
    } as const
}

type UnfollowACType = ReturnType<typeof unfollowAC>
export const unfollowAC = (userId: string) => {
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

export default usersReducer