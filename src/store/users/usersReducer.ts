import { AppDispatchType } from 'store/redux-store'
import { CLEAN_REDUCER, CleanReducerType } from 'store/auth/authReducer'
import { UserResponseType, ResultCode, usersAPI } from 'api/social-network-api'
import { setAppIsLoading, addAppAlert, SetAppIsLoadingActionType, AddAlertActionType } from 'store/app/appReducer'

//CONSTANTS
const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const SET_USERS = 'USERS/SET-USERS'
const SET_CURRENT_PAGE = 'USERS/SET-CURRENT-PAGE'
const SET_USERS_ON_PAGE = 'USERS/SET-USERS-ON-PAGE'
const CHANGE_SEARCH_TERM = 'USERS/CHANGE-SEARCH-TERM'
const CHANGE_USERS_FILTER = 'USERS/CHANGE-USERS-FILTER'
const SET_TOTAL_USERS_COUNT = 'USERS/SET-TOTAL-USERS-COUNT'
const CHANGE_USER_IS_LOADING = 'USERS/CHANGE-USER-IS-LOADING'

//INITIAL STATE
const initialState = {
    searchTerm: '',
    currentPage: 1,
    usersOnPage: 15,
    totalUsersCount: 0,
    users: [] as UserStateType[],
    usersFilter: 'all' as UsersFilterType,
}

//REDUCER
export const usersReducer = (state: UsersStateType = initialState, action: UsersReducerActionsType): UsersStateType => {
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
            return { ...state, users: action.payload.users.map(user => ({ ...user, isLoading: false })) }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload.currentPage }
        case SET_USERS_ON_PAGE:
            return { ...state, usersOnPage: action.payload.usersOnPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.payload.totalUsersCount }
        case CHANGE_USERS_FILTER:
            return { ...state, usersFilter: action.payload.usersFilter }
        case CHANGE_SEARCH_TERM:
            return { ...state, searchTerm: action.payload.searchTerm }
        case CHANGE_USER_IS_LOADING:
            return {
                ...state, users: state.users.map(user => user.id === action.payload.userId
                    ? { ...user, isLoading: action.payload.isLoading }
                    : user)
            }
        case CLEAN_REDUCER:
            return initialState
        default:
            return state
    }
}

//ACTIONS
const setFollowUser = (userId: number) =>
    ({ type: FOLLOW, payload: { userId } }) as const
const setUnfollowUser = (userId: number) =>
    ({ type: UNFOLLOW, payload: { userId } }) as const
const setUsers = (users: UserResponseType[]) =>
    ({ type: SET_USERS, payload: { users } }) as const
const setCurrentPage = (currentPage: number) =>
    ({ type: SET_CURRENT_PAGE, payload: { currentPage } }) as const
const setUsersOnPage = (usersOnPage: number) =>
    ({ type: SET_USERS_ON_PAGE, payload: { usersOnPage } }) as const
const setTotalUsersCount = (totalUsersCount: number) =>
    ({ type: SET_TOTAL_USERS_COUNT, payload: { totalUsersCount } }) as const
export const setUsersSearchTerm = (searchTerm: string) =>
    ({ type: CHANGE_SEARCH_TERM, payload: { searchTerm } }) as const
export const changeUsersFilter = (usersFilter: UsersFilterType) =>
    ({ type: CHANGE_USERS_FILTER, payload: { usersFilter } }) as const
const changeUserIsLoading = (userId: number, isLoading: boolean) =>
    ({ type: CHANGE_USER_IS_LOADING, payload: { userId, isLoading } }) as const

//THUNKS
export const getUsers = (pageNumber: number, usersOnPage: number, isFriend: boolean | null, searchTerm: string) => (dispatch: AppDispatchType) => {
    dispatch(setAppIsLoading(true))
    usersAPI.getUsers(pageNumber, usersOnPage, isFriend, searchTerm)
        .then(res => {
            dispatch(setTotalUsersCount(res.data.totalCount))
            dispatch(setCurrentPage(pageNumber))
            dispatch(setUsersOnPage(usersOnPage))
            dispatch(setUsers(res.data.items))
        })
        .catch(error => {
            dispatch(addAppAlert('failed', error.message))
        })
        .finally(() => dispatch(setAppIsLoading(false)))
}

export const followUser = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(changeUserIsLoading(userId, true))
    dispatch(setAppIsLoading(true))
    usersAPI.followUser(userId)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setFollowUser(userId))
                dispatch(addAppAlert('succeeded', 'Followed!'))
            }
            else {
                dispatch(addAppAlert('failed', res.data.messages[0]))
            }
        })
        .catch(error => {
            dispatch(addAppAlert('failed', error.message))
        })
        .finally(() => {
            dispatch(setAppIsLoading(false))
            dispatch(changeUserIsLoading(userId, false))
        })
}
export const unfollowUser = (userId: number) => (dispatch: AppDispatchType) => {
    dispatch(changeUserIsLoading(userId, true))
    dispatch(setAppIsLoading(true))
    usersAPI.unfollowUser(userId)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setUnfollowUser(userId))
                dispatch(addAppAlert('succeeded', 'Unfollowed!'))
            }
            else {
                dispatch(addAppAlert('failed', res.data.messages[0]))
            }
        })
        .catch(error => {
            dispatch(addAppAlert('failed', error.message))
        })
        .finally(() => {
            dispatch(setAppIsLoading(false))
            dispatch(changeUserIsLoading(userId, false))
        })
}

//TYPES
export type UsersReducerActionsType =
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersOnPage>
    | ReturnType<typeof changeUsersFilter>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setUsersSearchTerm>
    | ReturnType<typeof changeUserIsLoading>
    | SetAppIsLoadingActionType
    | UnfollowUserActionType
    | FollowUserActionType
    | AddAlertActionType
    | CleanReducerType
export type FollowUserActionType = ReturnType<typeof setFollowUser>
export type UnfollowUserActionType = ReturnType<typeof setUnfollowUser>
export interface UserStateType extends UserResponseType {
    isLoading: boolean
}
export type UsersStateType = typeof initialState
export type UsersFilterType = 'all' | 'followed' | 'unfollowed'