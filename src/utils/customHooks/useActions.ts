import { useMemo } from "react"
import { ActionCreatorsMapObject, bindActionCreators } from "redux"
import { appActions, appThunks } from 'store/app/appReducer'
import { authThunks } from 'store/auth/authReducer'
import { friendsThunks } from 'store/friends/friendsReducer'
import { messagesThunks } from 'store/messages/messagesReducer'
import { usersActions, usersThunks } from 'store/users/usersReducer'
import { useAppDispatch } from 'utils/customHooks/useAppDispatch'

// ❗ упаковываем actions и соответсвенно при вызове хука не нужно
// будет передавать actions
const actionsAll = {
  ...appThunks, ...appActions, ...messagesThunks,
  ...authThunks, ...friendsThunks, ...usersThunks,
  ...usersActions
}

type AllActions = typeof actionsAll

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(
    () => bindActionCreators<AllActions, RemapActionCreators<AllActions>>(actionsAll, dispatch),
    [dispatch],
  )
}

// Types
type ReplaceReturnType<T> = T extends (...args: any[]) => any
  ? (...args: Parameters<T>) => ReturnType<ReturnType<T>>
  : () => T

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K]>
}