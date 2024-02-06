import { Dispatch } from 'redux';
import { socialNetworkAPI } from '../api/social-network-api';
import { UserStateType } from "./usersReducer"


export const SET_FRIENDS = 'SET-FRIENDS'

export type FriendsReducerActionsType = SetFriendsACType
export type FriendsReducerThunksType = GetFriendsTCType

const initialState: UserStateType[] = []

const friendsReducer = (state: UserStateType[] = initialState, action: FriendsReducerActionsType): UserStateType[] => {
    switch (action.type) {
        case SET_FRIENDS:
            return [...action.payload.friends]
        default: return state
    }
}

type SetFriendsACType = ReturnType<typeof setFriendsAC>
export const setFriendsAC = (friends: UserStateType[]) => {
    return {
        type: SET_FRIENDS,
        payload: {
            friends
        }
    } as const
}

type GetFriendsTCType = ReturnType<typeof getFriendsTC>
export const getFriendsTC = () => {
    return (dispatch: Dispatch) => {
        socialNetworkAPI.getFriends()
            .then(res => {
                const friends = res.data.items
                dispatch(setFriendsAC(friends))
            })
    }
}

export default friendsReducer