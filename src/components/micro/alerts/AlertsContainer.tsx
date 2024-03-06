import { connect } from "react-redux"
import { AppRootStateType } from "../../../redux/redux-store"
import { AlertObjectType, removeAlert } from "../../../redux/appReducer"
import { Alerts } from "./Alerts"
import { compose } from "redux"

type AlertsAPIPropsTtype = {
    alerts: AlertObjectType[]
    removeAlert: (alertId: string) => void
}

export const AlertsAPI: React.FC<AlertsAPIPropsTtype> = (props) => {

    return (
        <Alerts
            alerts={props.alerts}
            removeAlert={props.removeAlert}
        />
    )
}

type MapStatePropsType = {
    alerts: AlertObjectType[]
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        alerts: state.app.alerts
    }
}

export const AlertsContainer = compose(
    connect(mapStateToProps, { removeAlert })
)(AlertsAPI)