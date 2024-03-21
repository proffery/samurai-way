
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatchType, AppRootStateType } from 'store/redux-store'
/**
 * Функция-оберека для типизации createAsyncThunk
 * https://redux-toolkit.js.org/usage/usage-with-typescript
 * Config:
 * return type for `thunkApi.getState`
 * state?: unknown
 * type for `thunkApi.dispatch` 
 * dispatch?: Dispatch
 * type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra`
 * extra?: unknown
 * type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload`
 * rejectValue?: unknown
 * return type of the `serializeError` option callback
 * serializedErrorType?: unknown
 * type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta`
 * pendingMeta?: unknown
 * type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta`
 * fulfilledMeta?: unknown
 * type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta`
 * rejectedMeta?: unknown
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatchType
  rejectValue: null 
}>()
