import { Alert } from "components/common/alerts/alert/Alert"
import { memo } from "react"
import { useSelector } from "react-redux"
import { selectAlerts } from "store/app/appSelectors"
import { S } from "./alert/Alert_Styles"
import { useActions } from "utils/customHooks/useActions"

export const Alerts: React.FC = memo(() => {
    const alerts = useSelector(selectAlerts)
    const { removeAppAlert } = useActions()
    return (
        <S.Container>
            {alerts.map((alert) => (
                <Alert
                    key={alert.id}
                    alertId={alert.id}
                    alertMessage={alert.message}
                    alertType={alert.type}
                    removeAlert={removeAppAlert}
                />
            ))}
        </S.Container>
    )
})
