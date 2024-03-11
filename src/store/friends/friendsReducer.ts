import { UserResponseType, usersAPI } from 'api/social-network-api'
import { addAppAlert, setAppIsLoading, SetAppIsLoadingActionType } from 'store/app/appReducer'
import { CLEAN_REDUCER, CleanReducerType } from 'store/auth/authReducer'
import { AppDispatchType } from 'store/redux-store'


//CONSTANTS
const SET_FRIENDS = 'FRIENDS/SET-FRIENDS'
const SET_FRIENDS_ON_PAGE = 'FRIENDS/SET-FRIENDS-ON-PAGE'
const SET_CURRENT_FRIENDS_PAGE = 'FRIENDS/SET-CURRENT-FRIENDS--PAGE'
const SET_TOTAL_FRIENDS_COUNT = 'FRIENDS/SET-TOTAL-FRIENDS-COUNT'

const SET_POSSIBLE_FRIENDS = 'FRIENDS/SET-POSSIBLE-FRIENDS'
const SET_POSSIBLE_FRIENDS_ON_PAGE = 'FRIENDS/SET-POSSIBLE-FRIENDS-ON-PAGE'
const SET_POSSIBLE_FRIENDS_CURRENT_PAGE = 'FRIENDS/SET-POSSIBLE-FRIENDS-CURRENT-PAGE'
const SET_TOTAL_POSSIBLE_FRIENDS_COUNT = 'FRIENDS/SET-TOTAL-POSSIBLE-FRIENDS-COUNT'

//INITIAL STATE
const initialState = {
    friends: {
        users: [],
        usersOnPage: 5,
        totalUsersCount: 0,
        currentPage: 1,
    },
    possibleFriends: {
        users: [],
        usersOnPage: 5,
        totalUsersCount: 0,
        currentPage: 1,
    }
}

//REDUCER
export const friendsReducer = (state: FriendsStateType = initialState, action: FriendsReducerActionsType): FriendsStateType => {
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
        case CLEAN_REDUCER:
            return initialState
        default:
            return state
    }
}

//ACTIONS
const setFriends = (users: UserResponseType[]) =>
    ({ type: SET_FRIENDS, payload: { users } }) as const
const setFriendsPage = (currentPage: number) =>
    ({ type: SET_CURRENT_FRIENDS_PAGE, payload: { currentPage } }) as const
const setFriendsOnPage = (usersOnPage: number) =>
    ({ type: SET_FRIENDS_ON_PAGE, payload: { usersOnPage } }) as const
const setTotalFriendsCount = (totalUsersCount: number) =>
    ({ type: SET_TOTAL_FRIENDS_COUNT, payload: { totalUsersCount } }) as const
const setPossibleFriends = (users: UserResponseType[]) =>
    ({ type: SET_POSSIBLE_FRIENDS, payload: { users } }) as const
const setPossibleFriendsPage = (currentPage: number) =>
    ({ type: SET_POSSIBLE_FRIENDS_CURRENT_PAGE, payload: { currentPage } }) as const
const setPossibleFriendsOnPage = (usersOnPage: number) =>
    ({ type: SET_POSSIBLE_FRIENDS_ON_PAGE, payload: { usersOnPage } }) as const
const setPossibleTotalFriendsCount = (totalUsersCount: number) =>
    ({ type: SET_TOTAL_POSSIBLE_FRIENDS_COUNT, payload: { totalUsersCount } }) as const

//THUNKS
export const getFriends = (pageNumber: number, usersOnPage: number, isFriend: boolean) =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppIsLoading(true))
        usersAPI.getSortedUsers(pageNumber, usersOnPage, isFriend)
            .then(res => {
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
            })
            .catch(error => {
                dispatch(addAppAlert('failed', error.message))
            })
            .finally(() => dispatch(setAppIsLoading(false)))
    }

//TYPES
export type FriendsReducerActionsType =
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
export type FriendsType = {
    users: UserResponseType[],
    usersOnPage: number,
    totalUsersCount: number,
    currentPage: number,
}
export type FriendsStateType = {
    friends: FriendsType,
    possibleFriends: FriendsType
}