import axios, { AxiosError } from "axios"
import { appThunks } from 'store/app/appReducer'
import { AppDispatchType } from 'store/redux-store'

/**
 * Данная функция обрабатывает глобальные ошибки приложения или сети.
 * @param e - глобальная ошибка
 * @param dispatch - функция для отправки сообщений в store Redux
 */
export const handleServerNetworkError = (e: unknown, dispatch: AppDispatchType) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred"
    dispatch(appThunks.addAppAlert('failed', error))
  } else {
    dispatch(appThunks.addAppAlert('failed', `${err.message}`))
  }
}
