import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux"
import thunk, { ThunkDispatch } from "redux-thunk"
import { appReducer } from "./app/appReducer"
import { authReducer } from "./auth/authReducer"
import { messagesReducer } from "./messages/messagesReducer"
import { profileReducer } from "./profile/profileReducer"
import { usersReducer } from "./users/usersReducer"
import { friendsReducer } from './friends/friendsReducer'
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
window.store = store