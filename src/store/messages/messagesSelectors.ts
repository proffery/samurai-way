import { DialogResponse, MessageResponse } from 'api/dialogsAPI'
import { MessagesState } from 'store/messages/messagesReducer'
import { AppRootState } from 'store/redux-store'

export const selectMessagesState = (state: AppRootState): MessagesState => state.messages
export const selectMessages = (state: AppRootState): MessageResponse[] => state.messages.messages
export const selectDialogs = (state: AppRootState): DialogResponse[] => state.messages.dialogs
export const selectMessagesCurrentPage = (state: AppRootState): number => state.messages.currentPage
export const selectMessagesOnPage = (state: AppRootState): number => state.messages.messagesOnPage
export const selectTotalMessagesCount = (state: AppRootState): number => state.messages.totalMessagesCount