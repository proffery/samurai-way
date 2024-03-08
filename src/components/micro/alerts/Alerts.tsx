import styled from "styled-components"
import { AlertObjectType } from "../../../redux/app/appReducer"
import { Alert } from "./Alert"

type AlertsPropsType = {
    alerts: AlertObjectType[]
    removeAlert: (alertId: string) => void
}
export const Alerts: React.FC<AlertsPropsType> = (props) => {
    return (
        <AlertsWrapper>
            {props.alerts.map(alert =>
                <Alert
                    key={alert.id}
                    alertId={alert.id}
                    alertMessage={alert.message}
                    alertType={alert.type}
                    removeAlert={props.removeAlert}
                />)}
        </AlertsWrapper>
    )
}

const AlertsWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
`