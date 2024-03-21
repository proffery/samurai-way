import { AppRootStateType } from 'store/redux-store'
import { DialogResponseType, MessageRasponseType } from 'api/social-network-api'

export const selectMessages = (state: AppRootStateType): MessageRasponseType[] => state.messages.messages
export const selectDialogs = (state: AppRootStateType): DialogResponseType[] => state.messages.dialogs