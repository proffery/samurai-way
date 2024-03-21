import { createSlice } from '@reduxjs/toolkit'
import { DialogResponseType, dialogsAPI, MessageRasponseType, ResultCode } from 'api/social-network-api'
import { appActions } from 'store/app/appReducer'
import { clearReducers } from 'store/common.actions'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'
import { handleServerNetworkError } from 'utils/handle-server-network-error'


//INITIAL STATE
const initialState = {
    messages: [] as MessageRasponseType[],
    dialogs: [] as DialogResponseType[],
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
    }
})

export const getDialogs = createAppAsyncThunk<{ dialogs: DialogResponseType[] }>(`${slice.name}/getDialogs`, async (_, thunkAPI) => {
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
            dispatch(getDialogs())
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

export const sendMessage = createAppAsyncThunk<undefined, { userId: number, message: string }>(`${slice.name}/sendMessage`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppIsLoading(true))
            const res = await dialogsAPI.sendMessage(arg.userId, arg.message)
            if (res.data.resultCode === ResultCode.success) {
                return undefined
            } else rejectWithValue(null)
        } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setAppIsLoading(false))
        }
    })

export type MessagesStateType = typeof initialState

export const messagesReducer = slice.reducer
export const messagesThunk = { startDialog, getDialogs, sendMessage }