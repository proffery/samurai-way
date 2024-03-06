import { v1 } from "uuid"
import { CleanReducerType, getAuthPhoto, setAuthUserData, setIsLoggedIn } from "./authReducer"
import { AppDispatchType, AppRootStateType } from "./redux-store"
import { socialNetworkAPI } from '../api/social-network-api'

//CONSTANTS
const APP_SET_IS_LOADING = 'APP-SET-IS_LOADING'
const APP_ADD_ALERT = 'APP-ADD-ALERT'
const APP_REMOVE_ALERT = 'APP-REMOVE-ALERT'
const APP_SET_NAVBAR_COLLAPSED = 'APP-SET-NAVBAR-COLLAPSED'
const APP_SET_IS_INITIALIZED = 'APP-SET-IS_INITIALIZED'

//INITIAL STATE
const initialState: AppStateType = {
    footerLinks: [
        {
            id: 1,
            name: "Facebook",
            href: "#",
            icon_id: "facebook",
            viewBox: "0 0 24 24",
        },
        {
            id: 2,
            name: "Twitter",
            href: "#",
            icon_id: "twitter",
            viewBox: "0 0 24 24",
        },
        {
            id: 3,
            name: "Linkedin",
            href: "#",
            icon_id: "linkedin",
            viewBox: "0 0 24 24",
        },
        {
            id: 4,
            name: "Instagram",
            href: "#",
            icon_id: "instagram",
            viewBox: "0 0 24 24",
        },
        {
            id: 5,
            name: "YouTube",
            href: "#",
            icon_id: "youtube",
            viewBox: "0 0 24 24",
        },
        {
            id: 6,
            name: "RSS",
            href: "#",
            icon_id: "rss",
            viewBox: "0 0 24 24",
        },
    ],
    menuItems: [
        {
            id: 1,
            name: "Home",
            href: "/profile",
            icon_id: "home",
            viewBox: "-5 -5 30 30",
        },
        {
            id: 2,
            name: "Users",
            href: "/users",
            icon_id: "profile",
            viewBox: "-5 -5 30 30",
        },
        {
            id: 3,
            name: "Messages",
            href: "/messages",
            icon_id: "messages",
            viewBox: "-5 -5 30 30",
        },
        {
            id: 4,
            name: "Notifications",
            href: "/notifications",
            icon_id: "notifications",
            viewBox: "-3 -3 35 35",
        },
        {
            id: 5,
            name: "Settings",
            href: "/settings",
            icon_id: "settings",
            viewBox: "-2 -2 30 30",
        }
    ],
    isLoading: false,
    navbarCollapsed: true,
    alerts: [],
    isInitialized: false,
}

//REDUCER
export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case APP_SET_IS_LOADING:
            return { ...state, isLoading: action.payload.isLoading }
        case APP_ADD_ALERT:
            return { ...state, alerts: [...state.alerts, action.payload.newAlert] }
        case APP_REMOVE_ALERT:
            return { ...state, alerts: state.alerts.filter(alert => alert.id !== action.payload.id) }
        case APP_SET_NAVBAR_COLLAPSED:
            return { ...state, navbarCollapsed: action.payload.navbarCollapsed }
        case APP_SET_IS_INITIALIZED:
            return { ...state, isInitialized: action.payload.isInitialized }
        default:
            return state
    }
}

//ACTIONS
export const setAppIsLoading = (isLoading: boolean) =>
    ({ type: APP_SET_IS_LOADING, payload: { isLoading } } as const)
export const setAppAlert = (newAlert: AlertObjectType) =>
    ({ type: APP_ADD_ALERT, payload: { newAlert } } as const)
export const removeAlert = (id: string) =>
    ({ type: APP_REMOVE_ALERT, payload: { id } } as const)
export const setAppNavbarCollapsed = (navbarCollapsed: boolean) =>
    ({ type: APP_SET_NAVBAR_COLLAPSED, payload: { navbarCollapsed } } as const)
export const setAppIsInitialized = (isInitialized: boolean) =>
    ({ type: APP_SET_IS_INITIALIZED, payload: { isInitialized } } as const)

//THUNKS
export const initializeApp = () =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppIsLoading(true))
        return socialNetworkAPI.getMe()
            .then(res => {
                if (res.data.resultCode === 0) {
                    Promise.all([
                        dispatch(setAuthUserData(res.data.data)),
                        dispatch(setIsLoggedIn(true))])
                }
                else {
                    // dispatch(addAppAlert('failed', res.data.messages[0]))
                }
            })
            .catch(error => {
                dispatch(addAppAlert('failed', error.message))
            })
            .finally(() => {
                dispatch(setAppIsLoading(false))
                dispatch(setAppIsInitialized(true))
            })

    }

export const addAppAlert = (type: AlertType, message: string) =>
    (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
        const alerts = getState().app.alerts
        const alertDuplicat = alerts.find(alert => alert.message === message && alert.type === type)
        if (alertDuplicat) return
        const newAlert: AlertObjectType = {
            id: v1(),
            message,
            type
        }
        dispatch(setAppAlert(newAlert))
    }

//TYPES
export type AddAlertActionType = ReturnType<typeof setAppAlert>
export type RemoveAlertActionType = ReturnType<typeof removeAlert>
export type SetNavbarCollapsedActionType = ReturnType<typeof setAppNavbarCollapsed>
export type SetAppIsLoadingActionType = ReturnType<typeof setAppIsLoading>
export type SetAppIsInitializedType = ReturnType<typeof setAppIsInitialized>
type AppActionsType =
    | SetAppIsLoadingActionType
    | AddAlertActionType
    | RemoveAlertActionType
    | SetNavbarCollapsedActionType
    | SetAppIsInitializedType
    | CleanReducerType
export type IconLinksStateType = {
    id: number
    name: string
    href: string
    icon_id: string
    viewBox: string
}
export type AlertType = 'succeeded' | 'failed' | 'info'
export type AlertObjectType = {
    id: string
    type: AlertType
    message: string
}
export type AppStateType = {
    footerLinks: IconLinksStateType[]
    menuItems: IconLinksStateType[]
    isLoading: boolean
    navbarCollapsed: boolean
    alerts: AlertObjectType[]
    isInitialized: boolean
}
