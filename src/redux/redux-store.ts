import { combineReducers, createStore } from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import menuReducer from "./menuReducer";
import footerReducer from "./footerReducer";
const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    menu: menuReducer,
    footer: footerReducer
})
export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>