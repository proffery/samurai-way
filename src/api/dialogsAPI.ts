import { instance, ItemsResponse, PhotosResponse, Response } from 'api/api-instance'

export const dialogsAPI = {
    getDialogs() {
        return instance.get<DialogResponse[]>('dialogs')
    },
    startDialog(userId: number) {
        return instance.put<Response>(`dialogs/${userId}`)
    },
    getMessages(userId: number, currentPage: number, messagesOnPage: number) {
        return instance.get<ItemsResponse<MessageResponse[]>>(`dialogs/${userId}/messages?page=${currentPage}&count=${messagesOnPage}`)
    },
    sendMessage(userId: number, message: string) {
        return instance.post<Response<{ message: AddMessageResponse }>>(`dialogs/${userId}/messages`, { body: message })
    },
    checkIsMessageReaded(messageId: number) {
        return instance.get<Response>(`dialogs/messages/${messageId}/viewed`)
    },
    sendMessageToSpam(messageId: number) {
        return instance.post<Response>(`dialogs/messages/${messageId}/spam`)
    },
    deleteMessage(messageId: number) {
        return instance.delete<Response>(`dialogs/messages/${messageId}`)
    },
    restoreMessage(messageId: number) {
        return instance.put<Response>(`dialogs/messages/${messageId}/restore`)
    },
    getMessagesByDate(userId: number, date: string) {
        return instance.get<Response>(`dialogs/${userId}/messages/new?newerThen=${date}`)
    },
    getNewMessages() {
        return instance.get<Response>('dialogs/messages/new/count')
    }
}

export type DialogResponse = {
    id: number
    userName: string
    hasNewMessages: boolean
    newMessagesCount: number
    photos: PhotosResponse
    lastUserActivityDate: string
    lastDialogActivityDate: string
}
export type AddMessageResponse = {
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

export type MessageResponse = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: string | null
    viewed: boolean
}
