import { applyMiddleware, combineReducers, createStore } from "redux";
import postsReducer from "./postsReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";
import friendsReducer from "./friendsReducer";
import thunk from "redux-thunk";
import possibleFriendsReducer from "./possibleFriendsReducer";
import { appReducer } from "./appReducer";
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