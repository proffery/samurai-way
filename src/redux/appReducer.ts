const APP_SET_IS_LOADING = 'APP-SET-IS_LOADING'
const APP_SET_ALERT_MSG = 'APP-SET-ALERT-MSG'
const APP_SET_NAVBAR_COLLAPSED = 'APP-SET-NAVBAR-COLLAPSED'

export type IconLinksStateType = {
    id: number
    name: string
    href: string
    icon_id: string
    viewBox: string
}
export type RequestStatusType = null | 'succeeded' | 'failed' | 'info'

export type AppStateType = {
    socialLinks: IconLinksStateType[]
    menuItems: IconLinksStateType[]
    isLoading: boolean
    alertMessage: string | null
    navbarCollapsed: boolean
}
export type SetAlertMessageActionType = ReturnType<typeof setAppAlertMessageAC>
export type SetNavbarCollapsedActionType = ReturnType<typeof setAppNavbarCollapsedAC>
export type SetAppIsLoadingActionType = ReturnType<typeof setAppIsLoading>

type AppActionsType =
    | SetAppIsLoadingActionType
    | SetAlertMessageActionType
    | SetNavbarCollapsedActionType

const initialState: AppStateType = {
    socialLinks: [
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
    alertMessage: null,
    navbarCollapsed: true
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case APP_SET_IS_LOADING:
            return { ...state, isLoading: action.payload.isLoading }
        case APP_SET_ALERT_MSG:
            return { ...state, alertMessage: action.payload.alertMessage }
        case APP_SET_NAVBAR_COLLAPSED:
            return { ...state, navbarCollapsed: action.payload.navbarCollapsed }
        default:
            return state
    }
}

export const setAppIsLoading = (isLoading: boolean) =>
    ({ type: APP_SET_IS_LOADING, payload: { isLoading } } as const)

export const setAppAlertMessageAC = (alertMessage: string | null) =>
    ({ type: APP_SET_ALERT_MSG, payload: { alertMessage } } as const)

export const setAppNavbarCollapsedAC = (navbarCollapsed: boolean) =>
    ({ type: APP_SET_NAVBAR_COLLAPSED, payload: { navbarCollapsed } } as const) 