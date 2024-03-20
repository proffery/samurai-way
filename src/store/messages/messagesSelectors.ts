import { AppRootStateType } from 'store/redux-store'
import { DialogType, MessageType } from './messagesReducer'

export const selectMessages = (state: AppRootStateType): MessageType[] => state.messages.messages
export const selectDialogs = (state: AppRootStateType): DialogType[] => state.messages.dialogs