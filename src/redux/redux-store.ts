import { combineReducers, createStore } from "redux";
import postsReducer from "./postsReducer";
import messagesReducer from "./messagesReducer";
import menuReducer from "./menuReducer";
import footerReducer from "./footerReducer";
import usersReducer from "./usersReducer";
const rootReducer = combineReducers({
    posts: postsReducer,
    messages: messagesReducer,
    users: usersReducer,
    menu: menuReducer,
    footer: footerReducer
})
export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>