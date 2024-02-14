import { RequestStatusType, setAppAlertMessageAC, setAppRequestStatusAC } from "../appReducer"

export const showGlobalAppStatus = (dispatch: any, status: RequestStatusType, alertMessage: string) => {
    dispatch(setAppRequestStatusAC(status))
    dispatch(setAppAlertMessageAC(alertMessage))
    setTimeout(() => {
        dispatch(setAppRequestStatusAC('idle'))
        dispatch(setAppAlertMessageAC(''))
    }, 2000)
}