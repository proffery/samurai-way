import { Dispatch } from 'redux';
import { socialNetworkAPI } from '../api/social-network-api';
import { UserStateType } from "./usersReducer"


export const SET_FRIENDS = 'SET-FRIENDS'

export type FriendsReducerActionsType = ReturnType<typeof setFriendsAC>
export type FriendsReducerThunksType = typeof getFriendsTC
export type FriendsReducerThunksReturnType = ReturnType<typeof getFriendsTC> 

const initialState: UserStateType[] = []

const friendsReducer = (state: UserStateType[] = initialState, action: FriendsReducerActionsType): UserStateType[] => {
    switch (action.type) {
        case SET_FRIENDS:
            return [...action.payload.friends]
        default:
            return state
    }
}

export const setFriendsAC = (friends: UserStateType[]) => ({
    type: SET_FRIENDS,
    payload: {
        friends
    }
}) as const

export const getFriendsTC = () => (dispatch: Dispatch<FriendsReducerActionsType>) => {
    socialNetworkAPI.getFriends()
        .then(res => {
            const friends = res.data.items
            dispatch(setFriendsAC(friends))
        })
}

export default friendsReducer