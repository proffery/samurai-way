import { v1 } from "uuid"

export const ADD_MESSAGE = 'ADD-MESSAGE'
export const UPDATE_MESSAGE = 'UPDATE-MESSAGE'
export const ON_CHANGE_MESSAGE = 'ON-CHANGE-MESSAGE'

export type MessagesReducerActionsType = AddMessageACType | UpdateMessageACType | MessageOnChangeACType

export type MessageStateType = {
    id: string
    message: string
}
export type DialogStateType = {
    id: string
    name: string
    second_name: string
}
export type MessagesPageStateType = {
    messages: MessageStateType[]
    dialogs: DialogStateType[]
    newMessageForm: string
}
const initialState:MessagesPageStateType = {
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
}

const messagesReducer = (state: MessagesPageStateType = initialState, action: MessagesReducerActionsType): MessagesPageStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const newMessage: MessageStateType = {
                id: v1(),
                message: state.newMessageForm,
            }
            return {
                ...state, messages: [...state.messages, newMessage]
            }
        }
        case UPDATE_MESSAGE: {
            return {
                ...state, messages: state.messages.map(el => el.id === action.payload.messageId
                    ? { ...el, message: action.payload.newMessage }
                    : el
                )
            }
        }
        case ON_CHANGE_MESSAGE: {
            return {
                ...state, newMessageForm: action.payload.newMessage
            }
        }
        default: return state
    }
}

type AddMessageACType = ReturnType<typeof addMessageAC>
export const addMessageAC = () => {
    return {
        type: ADD_MESSAGE,
    } as const
}

type UpdateMessageACType = ReturnType<typeof updateMessageAC>
export const updateMessageAC = (messageId: string, newMessage: string) => {
    return {
        type: UPDATE_MESSAGE,
        payload: {
            newMessage,
            messageId
        }
    } as const
}

type MessageOnChangeACType = ReturnType<typeof messageOnChangeAC>
export const messageOnChangeAC = (newMessage: string) => {
    return {
        type: ON_CHANGE_MESSAGE,
        payload: {
            newMessage
        }
    } as const
}

export default messagesReducer