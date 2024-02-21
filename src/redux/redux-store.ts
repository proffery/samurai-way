import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { appReducer } from "./appReducer";
import { profileReducer } from "./profileReducer";
import { usersReducer } from "./usersReducer";
import { friendsReducer } from "./friendsReducer";
import { possibleFriendsReducer } from "./possibleFriendsReducer";
import { messagesReducer } from "./messagesReducer";
import { authReducer } from "./authReducer";
const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    friends: friendsReducer,
    possibleFriends: possibleFriendsReducer,
    users: usersReducer,
    app: appReducer,
    auth: authReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
// @ts-ignore
window.store = store;