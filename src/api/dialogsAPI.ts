import { instance, PhotosResponseType, ResponseType } from 'api/socialNetworkInstance'

export const dialogsAPI = {
    getDialogs() {
        return instance.get<DialogResponseType[]>('dialogs')
    },
    startDialog(userId: number) {
        return instance.put<ResponseType>(`dialogs/${userId}`)
    },
    getMessages(userId: number, pageNumber: number, messagesOnPage: number) {
        return instance.get<GetMessagesResponseType>(`dialogs/${userId}/messages?page=${pageNumber}&count=${messagesOnPage}`)
    },
    sendMessage(userId: number, message: string) {
        return instance.post<ResponseType<{ message: AddMessageResponseType }>>(`dialogs/${userId}/messages`, { body: message })
    },
    checkIsMessageReaded(messageId: number) {
        return instance.get<ResponseType>(`dialogs/messages/${messageId}/viewed`)
    },
    sendMessageToSpam(messageId: number) {
        return instance.post<ResponseType>(`dialogs/messages/${messageId}/spam`)
    },
    deleteMessage(messageId: number) {
        return instance.delete<ResponseType>(`dialogs/messages/${messageId}`)
    },
    restoreMessage(messageId: number) {
        return instance.put<ResponseType>(`dialogs/messages/${messageId}/restore`)
    },
    getMessagesByDate(userId: number, date: string) {
        return instance.get<ResponseType>(`dialogs/${userId}/messages/new?newerThen=${date}`)
    },
    getNewMessages() {
        return instance.get<ResponseType>('dialogs/messages/new/count')
    }
}

export type DialogResponseType = {
    id: number
    userName: string
    hasNewMessages: boolean
    newMessagesCount: number
    photos: PhotosResponseType
    lastUserActivityDate: string
    lastDialogActivityDate: string
}
export type AddMessageResponseType = {
    id: string
    body: string
    translatedBody: string | null
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    recipientName: string
    viewed: false
    deletedBySender: false
    deletedByRecipient: false
    isSpam: false
    distributionId: number | null
}

export type MessageResponseType = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: string | null
    viewed: boolean
}
export type GetMessagesResponseType = {
    error: string | null
    items: MessageResponseType[]
    totalCount: number
}