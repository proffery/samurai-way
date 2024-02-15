import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./appReducer";
import { profileReducer } from "./profileReducer";
import { usersReducer } from "./usersReducer";
import { friendsReducer } from "./friendsReducer";
import { possibleFriendsReducer } from "./possibleFriendsReducer";
import { messagesReducer } from "./messagesReducer";
const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    friends: friendsReducer,
    possibleFriends: possibleFriendsReducer,
    users: usersReducer,
    app: appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>