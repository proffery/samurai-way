import messagesReducer, { ADD_MESSAGE, MessagesReducerActionsType, ON_CHANGE_MESSAGE, UPDATE_MESSAGE, addMessageAC, messageOnChangeAC, updateMessageAC } from './messagesReducer';
import profileReducer, { ADD_POST, ON_CHANGE_POST, ProfileReducerActionsType, UPDATE_POST, addPostAC, postOnChangeAC, updatePostAC } from './profileReducer';
import { v1 } from "uuid"

export type PostStateType = {
    id: string
    message: string
    likeCount: number
    commentsCount: number
}

export type MessageStateType = {
    id: string
    message: string
}

export type DialogStateType = {
    id: string
    name: string
    second_name: string
}

export type FriendStateType = {
    id: number
    name: string
    second_name: string
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
    friends: FriendStateType[]
    newPostForm: string
}

export type MessagesPageStateType = {
    messages: MessageStateType[]
    dialogs: DialogStateType[]
    newMessageForm: string
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

export type ReducersActionsTypes = ProfileReducerActionsType | MessagesReducerActionsType
export type ReducersStateType = ProfilePageStateType | MessagesPageStateType

export type StoreType = {
    _state: RootStateType
    _callSubcriber: (_state: RootStateType) => void
    getState: () => RootStateType
    dispatch: (action: ReducersActionsTypes) => void
    subscribe: (observer: () => void) => void
}

export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: v1(),
                    message: 'Hi',
                    likeCount: 10,
                    commentsCount: 20
                },
                {
                    id: v1(),
                    message: 'How are you?',
                    likeCount: 4,
                    commentsCount: 1
                },
                {
                    id: v1(),
                    message: 'Yo',
                    likeCount: 7,
                    commentsCount: 2
                },
                {
                    id: v1(),
                    message: 'Samurai way!',
                    likeCount: 12,
                    commentsCount: 1
                },
                {
                    id: v1(),
                    message: 'Bye-bye!',
                    likeCount: 1,
                    commentsCount: 0
                },
            ],
            friends: [
                {
                    id: 1,
                    name: 'Dimych',
                    second_name: 'Incubator'
                },
                {
                    id: 2,
                    name: 'Anrew',
                    second_name: 'Incubator'
                },
                {
                    id: 3,
                    name: 'Sveta',
                    second_name: 'Incubator'
                },
                {
                    id: 4,
                    name: 'Sasha',
                    second_name: 'Incubator'
                },
                {
                    id: 5,
                    name: 'Viktor',
                    second_name: 'Incubator'
                },
                {
                    id: 6,
                    name: 'Dimych',
                    second_name: 'Incubator'
                },
            ],
            newPostForm: ''
        },
        messagesPage: {
            messages: [
                {
                    id: '1',
                    message: 'Hi'
                },
                {
                    id: '2',
                    message: 'How are you?'
                },
                {
                    id: '3',
                    message: 'Yo'
                },
                {
                    id: '4',
                    message: 'Samurai way!'
                },
                {
                    id: '5',
                    message: 'By-by!'
                },
            ],
            dialogs: [
                {
                    id: '1',
                    name: 'Dimych',
                    second_name: 'Incubator'
                },
                {
                    id: '2',
                    name: 'Anrew',
                    second_name: 'Incubator'
                },
                {
                    id: '3',
                    name: 'Sveta',
                    second_name: 'Incubator'
                },
                {
                    id: '4',
                    name: 'Sasha',
                    second_name: 'Incubator'
                },
                {
                    id: '5',
                    name: 'Viktor',
                    second_name: 'Incubator'
                },
                {
                    id: '6',
                    name: 'Dimych',
                    second_name: 'Incubator'
                },
            ],
            newMessageForm: ''
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
    },
    _callSubcriber(_state: RootStateType) {
        console.log('State changed!');
    },
    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubcriber = observer
    },
    dispatch(action) {
        switch (action.type) {
            case ADD_POST: {
                this._state.profilePage = profileReducer(this._state.profilePage, addPostAC())
                this._state.profilePage.newPostForm = ''
                this._callSubcriber(this._state)
                break
            }
            case UPDATE_POST: {
                this._state.profilePage = profileReducer(this._state.profilePage, updatePostAC(action.payload.postId, action.payload.newPost))
                this._callSubcriber(this._state)
                break
            }
            case ON_CHANGE_POST: {
                this._state.profilePage = profileReducer(this._state.profilePage, postOnChangeAC(action.payload.newPost))
                this._callSubcriber(this._state)
                break
            }
            case ADD_MESSAGE: {
                this._state.messagesPage = messagesReducer(this._state.messagesPage, addMessageAC())
                this._state.messagesPage.newMessageForm = ''
                this._callSubcriber(this._state)
                break
            }
            case UPDATE_MESSAGE: {
                this._state.messagesPage = messagesReducer(this._state.messagesPage, updateMessageAC(action.payload.messageId, action.payload.newMessage))
                this._callSubcriber(this._state)
                break
            }
            case ON_CHANGE_MESSAGE: {
                this._state.messagesPage = messagesReducer(this._state.messagesPage, messageOnChangeAC(action.payload.newMessage))
                this._callSubcriber(this._state)
                break
            }
        }
    }
}