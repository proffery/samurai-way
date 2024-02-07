import { Dispatch } from 'redux';
import { UserStateType, socialNetworkAPI } from '../api/social-network-api';

export const SET_POSSIBLE_FRIENDS = 'SET-POSSIBLE-FRIENDS'

export type FriendsReducerActionsType = ReturnType<typeof setPossibleFriendsAC>
export type FriendsReducerThunksType = typeof getPossibleFriendsTC
export type FriendsReducerThunksReturnType = ReturnType<typeof getPossibleFriendsTC> 

const initialState: UserStateType[] = []

const possibleFriendsReducer = (state: UserStateType[] = initialState, action: FriendsReducerActionsType): UserStateType[] => {
    switch (action.type) {
        case SET_POSSIBLE_FRIENDS:
            return [...action.payload.possibleFriends]
        default:
            return state
    }
}

export const setPossibleFriendsAC = (possibleFriends: UserStateType[]) => ({
    type: SET_POSSIBLE_FRIENDS,
    payload: {
        possibleFriends
    }
}) as const

export const getPossibleFriendsTC = () => (dispatch: Dispatch<FriendsReducerActionsType>) => {
    socialNetworkAPI.getPossibleFriends()
        .then(res => {
            const possibleFriends = res.data.items
            dispatch(setPossibleFriendsAC(possibleFriends))
        })
}

export default possibleFriendsReducer