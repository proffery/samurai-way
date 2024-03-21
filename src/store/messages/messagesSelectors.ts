import { AppRootStateType } from 'store/redux-store'
import { DialogResponseType, MessageResponseType } from 'api/social-network-api'

export const selectMessages = (state: AppRootStateType): MessageResponseType[] => state.messages.messages
export const selectDialogs = (state: AppRootStateType): DialogResponseType[] => state.messages.dialogs