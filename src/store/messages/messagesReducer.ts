import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'store/app/appReducer'
import { clearReducers } from 'store/common.actions'
import { createAppAsyncThunk } from 'utils/createAppAsyncThunk'
import { handleServerNetworkError } from 'utils/handleServerNetworkError'
import { ResultCode } from 'api/api-instance'
import { DialogResponse, dialogsAPI, MessageResponse } from 'api/dialogsAPI'


//INITIAL STATE
const initialState = {
    dialogs: [] as DialogResponse[],
    messages: [] as MessageResponse[],
    currentPage: 1 as number,
    messagesOnPage: 10 as number,
    totalMessagesCount: 0 as number
}
//SLICE
const slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearReducers, () => {
                return initialState
            })
            .addCase(getDialogs.fulfilled, (state, action) => {
                state.dialogs = action.payload.dialogs
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload)
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload.messages
                state.totalMessagesCount = action.payload.totalCount
                state.currentPage = action.payload.currentPage
                state.messagesOnPage = action.payload.mesagesOnPage
            })
    }
})

export const getDialogs = createAppAsyncThunk<{ dialogs: DialogResponse[] }>(`${slice.name}/getDialogs`, async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setAppIsLoading(true))
        const res = await dialogsAPI.getDialogs()
        return { dialogs: res.data }
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
    }
})

export const startDialog = createAppAsyncThunk<undefined, number>(`${slice.name}/startDialog`, async (userId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setAppIsLoading(true))
        const res = await dialogsAPI.startDialog(userId)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(messagesThunks.getDialogs())
            return undefined
        }
        else rejectWithValue(null)
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
    }
})

export const sendMessage = createAppAsyncThunk<MessageResponse, SendMessageArgs>
    (`${slice.name}/sendMessage`, async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppIsLoading(true))
            const res = await dialogsAPI.sendMessage(arg.userId, arg.message)
            if (res.data.resultCode === ResultCode.success) {
                const { message } = res.data.data
                const model: MessageResponse = {
                    addedAt: message.addedAt,
                    body: message.body,
                    id: message.id,
                    recipientId: message.recipientId,
                    senderId: message.senderId,
                    senderName: message.senderName,
                    translatedBody: message.translatedBody,
                    viewed: message.viewed
                }
                return model
            } else return rejectWithValue(null)
        } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setAppIsLoading(false))
        }
    })

export const getMessages = createAppAsyncThunk<{
    messages: MessageResponse[],
    totalCount: number,
    currentPage: number,
    mesagesOnPage: number
},
    {
        userId: number,
        currentPage: number,
        messagesOnPage: number
    }>
    (`${slice.name}/getMessages`, async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setAppIsLoading(true))
            const res = await dialogsAPI.getMessages(arg.userId, arg.currentPage, arg.messagesOnPage)
            return {
                messages: res.data.items,
                totalCount: res.data.totalCount,
                currentPage: arg.currentPage,
                mesagesOnPage: arg.messagesOnPage
            }
        } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setAppIsLoading(false))
        }
    })

export type MessagesState = typeof initialState
type SendMessageArgs = { userId: number, message: string }

export const messagesReducer = slice.reducer
export const messagesThunks = { startDialog, getDialogs, sendMessage, getMessages }