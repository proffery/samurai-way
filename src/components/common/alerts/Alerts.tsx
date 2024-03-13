import { Alert } from 'components/common/alerts/Alert'
import { memo } from 'react'
import { AlertObjectType } from 'store/app/appReducer'
import styled from 'styled-components'

type AlertsPropsType = {
    alerts: AlertObjectType[]
    removeAppAlert: (alertId: string) => void
}
export const Alerts: React.FC<AlertsPropsType> = memo((props) => {
    return (
        <AlertsWrapper>
            {props.alerts.map(alert =>
                <Alert
                    key={alert.id}
                    alertId={alert.id}
                    alertMessage={alert.message}
                    alertType={alert.type}
                    removeAlert={props.removeAppAlert}
                />)}
        </AlertsWrapper>
    )
})

const AlertsWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
`