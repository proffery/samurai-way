import { authAPI } from "api/authAPI"
import { ResultCode } from "api/api-instance"
import { CleanReducers, getAuthPhoto, setAuthUserData, setIsLoggedIn } from "store/auth/authReducer"
import { AppDispatch, AppRootState } from "store/redux-store"
import { handleServerNetworkError } from "utils/handleServerNetworkError"
import { storageAvailable } from "utils/storageAvailable"
import { v1 } from "uuid"
import { messagesThunks } from "store/messages/messagesReducer"
import { Patch } from "components/app/Router/routeNames"

//CONSTANTS
const APP_ADD_ALERT = "APP/ADD-ALERT"
const APP_REMOVE_ALERT = "APP/REMOVE-ALERT"
const APP_SET_IS_LOADING = "APP/SET-IS_LOADING"
const APP_SET_CURRENT_PATH = "APP/SET-CURRENT-PATH"
const APP_SET_IS_INITIALIZED = "APP/SET-IS_INITIALIZED"

//INITIAL STATE
export const initialState = {
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
    ] as IconsLinks[],
    menuItems: [
        {
            id: 1,
            name: "Home",
            href: Patch.Profile,
            icon_id: "home",
            viewBox: "-5 -5 30 30",
        },
        {
            id: 2,
            name: "Users",
            href: Patch.Users,
            icon_id: "profile",
            viewBox: "-7 -5 30 30",
        },
        {
            id: 3,
            name: "Messages",
            href: Patch.Messages,
            icon_id: "messages",
            viewBox: "-6 -5 32 32",
        },
        {
            id: 4,
            name: "Local chat",
            href: Patch.Chat,
            icon_id: "chat",
            viewBox: "-3 -1 30 30",
        },
    ] as IconsLinks[],
    isLoading: false as boolean,
    alerts: [] as AlertObject[],
    isInitialized: false as boolean,
    currentPath: "/" as string,
}

//REDUCER
export const appReducer = (state: AppState = initialState, action: AppActions): AppState => {
    switch (action.type) {
        case APP_SET_IS_LOADING:
            return { ...state, isLoading: action.payload.isLoading }
        case APP_ADD_ALERT:
            return { ...state, alerts: [...state.alerts, action.payload.newAlert] }
        case APP_REMOVE_ALERT:
            return { ...state, alerts: state.alerts.filter((alert) => alert.id !== action.payload.id) }
        case APP_SET_IS_INITIALIZED:
            return { ...state, isInitialized: action.payload.isInitialized }
        case APP_SET_CURRENT_PATH:
            return { ...state, currentPath: action.payload.currentPath }
        default:
            return state
    }
}

//ACTIONS
export const setAppIsLoading = (isLoading: boolean) => ({ type: APP_SET_IS_LOADING, payload: { isLoading } }) as const
export const setAppAlert = (newAlert: AlertObject) => ({ type: APP_ADD_ALERT, payload: { newAlert } }) as const
export const removeAppAlert = (id: string) => ({ type: APP_REMOVE_ALERT, payload: { id } }) as const
export const setAppIsInitialized = (isInitialized: boolean) =>
    ({ type: APP_SET_IS_INITIALIZED, payload: { isInitialized } }) as const
export const setCurrentPath = (currentPath: string) =>
    ({ type: APP_SET_CURRENT_PATH, payload: { currentPath } }) as const

//THUNKS
export const initializeApp = () => async (dispatch: AppDispatch) => {
    dispatch(setAppIsLoading(true))
    try {
        const res = await authAPI.getMe()
        if (res.data.resultCode === ResultCode.success) {
            Promise.all([
                dispatch(setAuthUserData(res.data.data)),
                dispatch(getAuthPhoto(res.data.data.id)),
                dispatch(messagesThunks.getNewMessagesCount()),
                dispatch(loadPathFromStorage()),
                dispatch(setIsLoggedIn(true)),
            ]).then(() => dispatch(setAppIsInitialized(true)))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
        dispatch(setAppIsInitialized(true))
    }
}

export const addAppAlert =
    (type: AlertType, message: string) => (dispatch: AppDispatch, getState: () => AppRootState) => {
        const alerts: AlertObject[] = getState().app.alerts
        const alertDuplicat = alerts.find((alert) => alert.message === message && alert.type === type)
        if (alertDuplicat) return
        const newAlert: AlertObject = {
            id: v1(),
            message,
            type,
        }
        dispatch(setAppAlert(newAlert))
    }

export const savePathToStorage = (currentPath: string) => (dispatch: AppDispatch) => {
    if (storageAvailable("sessionStorage")) {
        sessionStorage.setItem("currentPath", currentPath)
    } else {
        dispatch(addAppAlert("info", "Session storage unavailable!"))
    }
}

export const loadPathFromStorage = () => (dispatch: AppDispatch, getState: () => AppRootState) => {
    if (storageAvailable("sessionStorage")) {
        const currentPath = sessionStorage.getItem("currentPath")
        if (!currentPath) {
            dispatch(savePathToStorage(getState().app.currentPath))
        } else {
            dispatch(setCurrentPath(currentPath))
        }
    } else {
        dispatch(addAppAlert("info", "Session storage unavailable!"))
    }
}

//TYPES
type RemoveAlert = ReturnType<typeof removeAppAlert>
export type AddAlert = ReturnType<typeof setAppAlert>
type SetCurrentPath = ReturnType<typeof setCurrentPath>
export type SetAppIsLoading = ReturnType<typeof setAppIsLoading>
export type SetAppIsInitialized = ReturnType<typeof setAppIsInitialized>
export type AppActions = SetAppIsLoading | SetCurrentPath | SetAppIsInitialized | RemoveAlert | AddAlert | CleanReducers
export type IconsLinks = {
    id: number
    name: string
    href: string
    icon_id: string
    viewBox: string
}
export type AlertType = "succeeded" | "failed" | "info"
export type AlertObject = {
    id: string
    type: AlertType
    message: string
}
export type AppState = typeof initialState

export const appThunks = { loadPathFromStorage, savePathToStorage, addAppAlert, initializeApp }
export const appActions = { setAppIsLoading, removeAppAlert }
