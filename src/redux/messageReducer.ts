import { v1 } from "uuid"
import { MessageStateType, MessagesPageStateType } from "./state"

export const ADD_MESSAGE = 'ADD-MESSAGE'
export const UPDATE_MESSAGE = 'UPDATE-MESSAGE'
export const ON_CHANGE_MESSAGE = 'ON-CHANGE-MESSAGE'

export type MessagesReducerActionsType = AddMessageACType | UpdateMessageACType | MessageOnChangeACType

const messagesReducer = (state: MessagesPageStateType, action: MessagesReducerActionsType): MessagesPageStateType => {
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