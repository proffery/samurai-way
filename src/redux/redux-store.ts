import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux"
import thunk, { ThunkDispatch } from "redux-thunk"
import { appReducer } from "./appReducer"
import { authReducer } from "./authReducer"
import { messagesReducer } from "./messagesReducer"
import { profileReducer } from "./profileReducer"
import { usersReducer } from "./usersReducer"
import { friendsReducer } from './friendsReducer'
const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    friends: friendsReducer,
    users: usersReducer,
    app: appReducer,
    auth: authReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
// @ts-ignore
window.store = store;