export type PostStateType = {
    id: number
    message: string
    likeCount: number
    commentsCount: number
}

export type MessageStateType = {
    id: number
    message: string
}


export type DialogStateType = {
    id: number
    name: string
}

export type SocialLinkStateType = {
    id: number
    name: string
    href: string
    icon_id: string
    viewBox: string
}

export type MenuItemStateType = {
    id: number
    name: string
    href: string
    icon_id: string
    viewBox: string
}

export type ProfilePageStateType = {
    posts: PostStateType[]
}

export type MessagesPageStateType = {
    messages: MessageStateType[]
    dialogs: DialogStateType[]
}

export type FooterStateType = {
    socialLinks: SocialLinkStateType[]
}

export type MenuStateType = {
    menuItems: MenuItemStateType[]
}

export type RootStateType = {
    profilePage: ProfilePageStateType
    messagesPage: MessagesPageStateType
    footer: FooterStateType
    menu: MenuStateType
}

export const state:RootStateType = {
    profilePage: {
        posts: [
            {
                id: 1,
                message: 'Hi',
                likeCount: 10,
                commentsCount: 10
            },
            {
                id: 2,
                message: 'How are you?',
                likeCount: 10,
                commentsCount: 10
            },
            {
                id: 3,
                message: 'Yo',
                likeCount: 10,
                commentsCount: 10
            },
            {
                id: 4,
                message: 'Samurai way!',
                likeCount: 10,
                commentsCount: 10
            },
            {
                id: 5,
                message: 'Bye-bye!',
                likeCount: 10,
                commentsCount: 10
            },
        ]
    },
    messagesPage: {
        messages: [
            {
                id: 1,
                message: 'Hi'
            },
            {
                id: 2,
                message: 'How are you?'
            },
            {
                id: 3,
                message: 'Yo'
            },
            {
                id: 4,
                message: 'Samurai way!'
            },
            {
                id: 5,
                message: 'By-by!'
            },
        ],
        dialogs: [
            {
                id: 1,
                name: 'Dimych'
            },
            {
                id: 2,
                name: 'Anrew'
            },
            {
                id: 3,
                name: 'Sveta'
            },
            {
                id: 4,
                name: 'Sasha'
            },
            {
                id: 5,
                name: 'Viktor'
            },
            {
                id: 6,
                name: 'Dimych'
            },
        ]
    },
    footer: {
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
        ]
    },
    menu: {
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
}