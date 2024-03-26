import { Alert } from 'components/common/alerts/Alert'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectAlerts } from 'store/app/appSelectors'
import styled from 'styled-components'
import { useActions } from 'utils/customHooks/useActions'

export const Alerts: React.FC = memo(() => {
    const alerts = useSelector(selectAlerts)
    const { removeAppAlert } = useActions()
    return <AlertsWrapper>
        {alerts.map(alert =>
            <Alert
                key={alert.id}
                alertId={alert.id}
                alertMessage={alert.message}
                alertType={alert.type}
                removeAlert={removeAppAlert}
            />)}
    </AlertsWrapper>
})

const AlertsWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
`