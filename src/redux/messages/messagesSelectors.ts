import { AppRootStateType } from 'redux/redux-store'
import { MessageType } from './messagesReducer'

export const selectMessages = (state: AppRootStateType): MessageType[] => state.messages.messages