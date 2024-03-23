import { DialogResponseType, MessageResponseType } from 'api/dialogsAPI'
import { AppRootStateType } from 'store/redux-store'

export const selectMessages = (state: AppRootStateType): MessageResponseType[] => state.messages.messages
export const selectDialogs = (state: AppRootStateType): DialogResponseType[] => state.messages.dialogs