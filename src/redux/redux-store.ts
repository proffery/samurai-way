import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./appReducer";
import { postsReducer } from "./postsReducer";
import { usersReducer } from "./usersReducer";
import { friendsReducer } from "./friendsReducer";
import { possibleFriendsReducer } from "./possibleFriendsReducer";
import { messagesReducer } from "./messagesReducer";
const rootReducer = combineReducers({
    posts: postsReducer,
    messages: messagesReducer,
    friends: friendsReducer,
    possibleFriends: possibleFriendsReducer,
    users: usersReducer,
    app: appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>