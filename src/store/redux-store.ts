import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { appReducer } from "store/app/appReducer"
import { authReducer } from "store/auth/authReducer"
import { friendsReducer } from "store/friends/friendsReducer"
import { messagesReducer } from "store/messages/messagesReducer"
import { profileReducer } from "store/profile/profileReducer"
import { usersReducer } from "store/users/usersReducer"

const rootReducer = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
  friends: friendsReducer,
  users: usersReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
