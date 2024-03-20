import { createAction } from "@reduxjs/toolkit"
import { CLEAR_REDUCER } from 'store/auth/authReducer'

export const clearReducers = createAction(CLEAR_REDUCER)
