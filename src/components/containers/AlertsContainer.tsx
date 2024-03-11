import { memo } from 'react'
import { compose } from "redux"
import { connect } from "react-redux"
import { AppRootStateType } from 'store/redux-store'
import { Alerts } from 'components/common/alerts/Alerts'
import { AlertObjectType, removeAppAlert } from 'store/app/appReducer'

export const AlertsAPI: React.FC<AlertsAPIPropsTtype> = memo((props) => {
    return (
        <Alerts
            alerts={props.alerts}
            removeAppAlert={props.removeAppAlert}
        />
    )
})

type MapStatePropsType = {
    alerts: AlertObjectType[]
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        alerts: state.app.alerts
    }
}

export const AlertsContainer = compose(
    connect(mapStateToProps, { removeAppAlert })
)(AlertsAPI)

//TYPES
type AlertsAPIPropsTtype = {
    alerts: AlertObjectType[]
    removeAppAlert: (alertId: string) => void
}