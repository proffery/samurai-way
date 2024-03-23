import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'store/app/appReducer'
import { clearReducers } from 'store/common.actions'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'
import { handleServerNetworkError } from 'utils/handle-server-network-error'
import { ResultCode } from 'api/socialNetworkInstance'
import { DialogResponseType, dialogsAPI, MessageResponseType } from 'api/dialogsAPI'


//INITIAL STATE
const initialState = {
    dialogs: [] as DialogResponseType[],
    messages: [] as MessageResponseType[],
    pageNumber: 1 as number,
    messagesCount: 10 as number
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
                state.messages = action.payload
            })
    }
})

export const getDialogs = createAppAsyncThunk<{ dialogs: DialogResponseType[] }>(`${slice.name}/getDialogs`, async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setAppIsLoading(true))
        const res = await dialogsAPI.getDialogs()
        dispatch(messagesThunk.getMessages(res.data[0].id))
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
            dispatch(messagesThunk.getDialogs())
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

export const sendMessage = createAppAsyncThunk<MessageResponseType, SendMessageArgType>
    (`${slice.name}/sendMessage`, async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppIsLoading(true))
            const res = await dialogsAPI.sendMessage(arg.userId, arg.message)
            if (res.data.resultCode === ResultCode.success) {
                const { message } = res.data.data
                const model: MessageResponseType = {
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

export const getMessages = createAppAsyncThunk<MessageResponseType[], number>
    (`${slice.name}/getMessages`, async (userId, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI

        try {
            dispatch(appActions.setAppIsLoading(true))
            const state = getState().messages
            const res = await dialogsAPI.getMessages(userId, state.pageNumber, state.messagesCount)
            return res.data.items
        } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setAppIsLoading(false))
        }
    })

export type MessagesStateType = typeof initialState
type SendMessageArgType = { userId: number, message: string }

export const messagesReducer = slice.reducer
export const messagesThunk = { startDialog, getDialogs, sendMessage, getMessages }