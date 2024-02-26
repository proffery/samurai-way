import styled from "styled-components"
import { AlertObjectType, removeAlert } from "../../../redux/appReducer"
import { Alert } from "./Alert"
import { AppDispatchType } from "../../../redux/redux-store"

type AlertsContainerPropsType = {
    alerts: AlertObjectType[]
    dispatch: AppDispatchType
}

export const AlertsContainer: React.FC<AlertsContainerPropsType> = (props) => {
    const removeAlertHandler = (alertId: string) => {
        props.dispatch(removeAlert(alertId))
    }
    return (
        <AlertContainer>
            {props.alerts.map(alert =>
                <Alert
                    key={alert.id}
                    alertId={alert.id}
                    alertMessage={alert.message}
                    alertType={alert.type}
                    removeAlert={removeAlertHandler}
                />)}
        </AlertContainer>
    )
}

const AlertContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
`