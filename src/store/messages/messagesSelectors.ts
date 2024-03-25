import { DialogResponse, MessageResponse } from 'api/dialogsAPI'
import { MessagesStateType } from 'store/messages/messagesReducer'
import { AppRootStateType } from 'store/redux-store'

export const selectMessagesState = (state: AppRootStateType): MessagesStateType => state.messages
export const selectMessages = (state: AppRootStateType): MessageResponse[] => state.messages.messages
export const selectDialogs = (state: AppRootStateType): DialogResponse[] => state.messages.dialogs
export const selectMessagesCurrentPage = (state: AppRootStateType): number => state.messages.currentPage
export const selectMessagesOnPage = (state: AppRootStateType): number => state.messages.messagesOnPage
export const selectTotalMessagesCount = (state: AppRootStateType): number => state.messages.totalMessagesCount