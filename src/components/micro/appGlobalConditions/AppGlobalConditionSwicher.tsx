import React from "react";
import { RequestStatusType } from "../../../redux/appReducer";
import { Alert } from "./conditions/Alert";
import { LoadingLoader } from "./conditions/LoadingLoader.styled";

type AppGlobalConditionSwicherPropsType = {
    requestStatus: RequestStatusType
    alertMessage: string | null
}
export const AppGlobalConditionSwicher: React.FC<AppGlobalConditionSwicherPropsType> = (props) => {

    const conditionsSwitcher = (status: RequestStatusType) => {
        switch (status) {
            case 'info':
                return <Alert requestStatus={status} alertMessage={props.alertMessage} />
            case 'failed':
                return <Alert requestStatus={status} alertMessage={props.alertMessage} />
            case 'succeeded':
                return <Alert requestStatus={status} alertMessage={props.alertMessage} />
            default:
                return null
        }
    }

    return conditionsSwitcher(props.requestStatus)
}