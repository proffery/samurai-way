
const initialState: MenuStateType = {
    menuItems: [
        {
            id: 1,
            name: "Home",
            href: "/feed",
            icon_id: "home",
            viewBox: "-5 -5 30 30",
        },
        {
            id: 2,
            name: "Profile",
            href: "/profile",
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
    ]
}
export type MenuItemStateType = {
    id: number
    name: string
    href: string
    icon_id: string
    viewBox: string
}
export type MenuStateType = {
    menuItems: MenuItemStateType[]
}

const menuReducer = (state: MenuStateType = initialState, action: any): MenuStateType => {
    return state
}

export default menuReducer