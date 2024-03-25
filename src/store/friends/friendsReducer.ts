import { AppDispatchType } from 'store/redux-store'
import { CLEAR_REDUCER, CleanReducerType } from 'store/auth/authReducer'
import { addAppAlert, setAppIsLoading, SetAppIsLoadingActionType } from 'store/app/appReducer'
import { UserResponseType, usersAPI } from 'api/usersAPI'


//CONSTANTS
const SET_FRIENDS = 'FRIENDS/SET-FRIENDS'
const SET_FRIENDS_ON_PAGE = 'FRIENDS/SET-FRIENDS-ON-PAGE'
const SET_TOTAL_FRIENDS_COUNT = 'FRIENDS/SET-TOTAL-FRIENDS-COUNT'
const SET_CURRENT_FRIENDS_PAGE = 'FRIENDS/SET-CURRENT-FRIENDS--PAGE'

const SET_POSSIBLE_FRIENDS = 'FRIENDS/SET-POSSIBLE-FRIENDS'
const SET_POSSIBLE_FRIENDS_ON_PAGE = 'FRIENDS/SET-POSSIBLE-FRIENDS-ON-PAGE'
const SET_TOTAL_POSSIBLE_FRIENDS_COUNT = 'FRIENDS/SET-TOTAL-POSSIBLE-FRIENDS-COUNT'
const SET_POSSIBLE_FRIENDS_CURRENT_PAGE = 'FRIENDS/SET-POSSIBLE-FRIENDS-CURRENT-PAGE'

//INITIAL STATE
export const initialState = {
    friends: {
        users: [] as UserResponseType[],
        usersOnPage: 5,
        totalUsersCount: 0,
        currentPage: 1,
    },
    possibleFriends: {
        users: [] as UserResponseType[],
        usersOnPage: 5,
        totalUsersCount: 0,
        currentPage: 1,
    }
}

//REDUCER
export const friendsReducer = (state: FriendsStateType = initialState, action: FriendsActionsType): FriendsStateType => {
    switch (action.type) {
        case SET_FRIENDS:
            return { ...state, friends: { ...state.friends, users: [...action.payload.users] } }
        case SET_CURRENT_FRIENDS_PAGE:
            return { ...state, friends: { ...state.friends, currentPage: action.payload.currentPage } }
        case SET_FRIENDS_ON_PAGE:
            return { ...state, friends: { ...state.friends, usersOnPage: action.payload.usersOnPage } }
        case SET_TOTAL_FRIENDS_COUNT:
            return { ...state, friends: { ...state.friends, totalUsersCount: action.payload.totalUsersCount } }
        case SET_POSSIBLE_FRIENDS:
            return { ...state, possibleFriends: { ...state.possibleFriends, users: [...action.payload.users] } }
        case SET_POSSIBLE_FRIENDS_CURRENT_PAGE:
            return { ...state, possibleFriends: { ...state.possibleFriends, currentPage: action.payload.currentPage } }
        case SET_POSSIBLE_FRIENDS_ON_PAGE:
            return { ...state, possibleFriends: { ...state.possibleFriends, usersOnPage: action.payload.usersOnPage } }
        case SET_TOTAL_POSSIBLE_FRIENDS_COUNT:
            return { ...state, possibleFriends: { ...state.possibleFriends, totalUsersCount: action.payload.totalUsersCount } }
        case CLEAR_REDUCER:
            return initialState
        default:
            return state
    }
}

//ACTIONS
export const setFriends = (users: UserResponseType[]) =>
    ({ type: SET_FRIENDS, payload: { users } }) as const
export const setFriendsPage = (currentPage: number) =>
    ({ type: SET_CURRENT_FRIENDS_PAGE, payload: { currentPage } }) as const
export const setFriendsOnPage = (usersOnPage: number) =>
    ({ type: SET_FRIENDS_ON_PAGE, payload: { usersOnPage } }) as const
export const setTotalFriendsCount = (totalUsersCount: number) =>
    ({ type: SET_TOTAL_FRIENDS_COUNT, payload: { totalUsersCount } }) as const
export const setPossibleFriends = (users: UserResponseType[]) =>
    ({ type: SET_POSSIBLE_FRIENDS, payload: { users } }) as const
export const setPossibleFriendsPage = (currentPage: number) =>
    ({ type: SET_POSSIBLE_FRIENDS_CURRENT_PAGE, payload: { currentPage } }) as const
export const setPossibleFriendsOnPage = (usersOnPage: number) =>
    ({ type: SET_POSSIBLE_FRIENDS_ON_PAGE, payload: { usersOnPage } }) as const
export const setPossibleTotalFriendsCount = (totalUsersCount: number) =>
    ({ type: SET_TOTAL_POSSIBLE_FRIENDS_COUNT, payload: { totalUsersCount } }) as const

//THUNKS
export const getFriends = (pageNumber: number, usersOnPage: number, isFriend: boolean) =>
    async (dispatch: AppDispatchType) => {
        dispatch(setAppIsLoading(true))
        try {
            const res = await usersAPI.getUsers(pageNumber, usersOnPage, isFriend, '')
            if (isFriend) {
                dispatch(setTotalFriendsCount(res.data.totalCount))
                dispatch(setFriendsPage(pageNumber))
                dispatch(setFriendsOnPage(usersOnPage))
                dispatch(setFriends(res.data.items))
            } else {
                dispatch(setPossibleTotalFriendsCount(res.data.totalCount))
                dispatch(setPossibleFriendsPage(pageNumber))
                dispatch(setPossibleFriendsOnPage(usersOnPage))
                dispatch(setPossibleFriends(res.data.items))
            }
        } catch (error: any) {
            dispatch(addAppAlert('failed', error.message))
        } finally { dispatch(setAppIsLoading(false)) }
    }

//TYPES
export type FriendsActionsType =
    | ReturnType<typeof setFriends>
    | ReturnType<typeof setFriendsPage>
    | ReturnType<typeof setFriendsOnPage>
    | ReturnType<typeof setTotalFriendsCount>
    | ReturnType<typeof setPossibleFriends>
    | ReturnType<typeof setPossibleFriendsPage>
    | ReturnType<typeof setPossibleFriendsOnPage>
    | ReturnType<typeof setPossibleTotalFriendsCount>
    | SetAppIsLoadingActionType
    | CleanReducerType

export type FriendsStateType = typeof initialState