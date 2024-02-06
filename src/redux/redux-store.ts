import { applyMiddleware, combineReducers, createStore } from "redux";
import postsReducer from "./postsReducer";
import messagesReducer from "./messagesReducer";
import menuReducer from "./menuReducer";
import footerReducer from "./footerReducer";
import usersReducer from "./usersReducer";
import friendsReducer from "./friendsReducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    posts: postsReducer,
    messages: messagesReducer,
    friends: friendsReducer,
    users: usersReducer,
    menu: menuReducer,
    footer: footerReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>