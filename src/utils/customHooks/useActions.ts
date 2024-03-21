import { useMemo } from "react"
import { ActionCreatorsMapObject, bindActionCreators } from "redux"
import { appThunks } from 'store/app/appReducer'
import { useAppDispatch } from 'utils/customHooks/useAppDispatch'

// ❗ упаковываем actions и соответсвенно при вызове хука не нужно
// будет передавать actions
const actionsAll = { ...appThunks }

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