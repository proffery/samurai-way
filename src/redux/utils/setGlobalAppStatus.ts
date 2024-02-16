import { RequestStatusType, setAppAlertMessageAC, setAppRequestStatusAC } from "../appReducer"

export const showGlobalAppStatus = (dispatch: any, status: RequestStatusType, alertMessage: string) => {
    dispatch(setAppRequestStatusAC(status))
    dispatch(setAppAlertMessageAC(alertMessage))
    setTimeout(() => {
        dispatch(setAppRequestStatusAC(null))
        dispatch(setAppAlertMessageAC(null))
    }, 2000)
}