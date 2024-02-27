import { v1 } from "uuid"
import { CLEAN_REDUCER, CleanReducerType } from "./authReducer"
import { AppDispatchType } from "./redux-store"

//CONSTANTS
export const ADD_MESSAGE = 'ADD-MESSAGE'
export const UPDATE_MESSAGE = 'UPDATE-MESSAGE'
export const ON_CHANGE_MESSAGE = 'ON-CHANGE-MESSAGE'

//INITIAL STATE
const initialState: MessagesPageStateType = {
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

//REDUCER
export const messagesReducer = (state: MessagesPageStateType = initialState, action: MessagesReducerActionsType): MessagesPageStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageStateType = {
                id: v1(),
                message: state.newMessageForm,
            }
            return { ...state, messages: [...state.messages, newMessage] }
        case UPDATE_MESSAGE:
            return {
                ...state, messages: state.messages.map(el => el.id === action.payload.messageId
                    ? { ...el, message: action.payload.newMessage }
                    : el
                )
            }
        case ON_CHANGE_MESSAGE:
            return { ...state, newMessageForm: action.payload.newMessage }
        case CLEAN_REDUCER:
            return initialState
        default: return state
    }
}

//ACTIONS
export const setMessage = () => ({ type: ADD_MESSAGE } as const)
export const updateMessage = (messageId: string, newMessage: string) =>
    ({ type: UPDATE_MESSAGE, payload: { newMessage, messageId } } as const)
export const onChangeMessage = (newMessage: string) =>
    ({ type: ON_CHANGE_MESSAGE, payload: { newMessage } } as const)
export const addMessage = () => (dispatch: AppDispatchType) => {
    dispatch(setMessage())
    dispatch(onChangeMessage(''))
}

//TYPES
export type MessagesReducerActionsType =
    | ReturnType<typeof setMessage>
    | ReturnType<typeof updateMessage>
    | ReturnType<typeof onChangeMessage>
    | CleanReducerType

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