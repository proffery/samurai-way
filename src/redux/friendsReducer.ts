export const SET_FRIENDS = 'SET-FRIENDS'

export type FriendsReducerActionsType = SetFriendsACType

export type FriendStateType = {
    id: string
    name: string
    second_name: string
    photoUrl: string
}

export type FriendsStateType = {
    friends: FriendStateType[]
}

const initialState: FriendsStateType = {
    friends: []
}

const friendsReducer = (state: FriendsStateType = initialState, action: FriendsReducerActionsType): FriendsStateType => {
    switch (action.type) {
        case SET_FRIENDS:
            return {...state, friends: [...action.payload.friends]}
        default: return state
    }
}

type SetFriendsACType = ReturnType<typeof setFriendsAC>
export const setFriendsAC = (friends: FriendStateType[]) => {
    return {
        type: SET_FRIENDS,
        payload: {
            friends
        }
    } as const
}

export default friendsReducer