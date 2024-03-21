import { createSlice } from '@reduxjs/toolkit'
import { clearReducers } from 'store/common.actions'


//INITIAL STATE
const initialState = {
    messages: [] as MessageType[],
    dialogs: [] as DialogType[],
}
//SLICE
const slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(clearReducers, () => {
            return initialState
        })
    }
})


//REDUCER
// export const messagesReducer = (state: MessagesPageStateType = initialState, action: MessagesReducerActionsType): MessagesPageStateType => {
//     switch (action.type) {
//         case ADD_MESSAGE:
//             const newMessage: MessageType = {
//                 id: v1(),
//                 message: state.newMessageForm,
//             }
//             return { ...state, messages: [...state.messages, newMessage] }
//         case UPDATE_MESSAGE:
//             return {
//                 ...state, messages: state.messages.map(el => el.id === action.payload.messageId
//                     ? { ...el, message: action.payload.newMessage }
//                     : el
//                 )
//             }
//         case ON_CHANGE_MESSAGE:
//             return { ...state, newMessageForm: action.payload.newMessage }
//         case CLEAN_REDUCER:
//             return initialState
//         default: return state
//     }
// }

//ACTIONS
// export const setMessage = () => ({ type: ADD_MESSAGE } as const)
// export const updateMessage = (messageId: string, newMessage: string) =>
//     ({ type: UPDATE_MESSAGE, payload: { newMessage, messageId } } as const)
// export const onChangeMessage = (newMessage: string) =>
//     ({ type: ON_CHANGE_MESSAGE, payload: { newMessage } } as const)
// export const addMessage = () => (dispatch: AppDispatchType) => {
//     dispatch(setMessage())
//     dispatch(onChangeMessage(''))
// }

//TYPES
// export type MessagesReducerActionsType =
//     | ReturnType<typeof setMessage>
//     | ReturnType<typeof updateMessage>
//     | ReturnType<typeof onChangeMessage>
//     | CleanReducerType

export const messagesReducer = slice.reducer

export type MessageType = {
    id: string
    message: string
}
export type DialogType = {
    id: string
    name: string
    second_name: string
}
export type MessagesStateType = typeof initialState