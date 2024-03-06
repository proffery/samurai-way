import { connect } from "react-redux"

import App from "./App"
import { initializeApp } from "./redux/authReducer"
import { AppRootStateType } from "./redux/redux-store"
import { compose } from "redux"

type AppAPIPropsTtype = {
    isLoggedIn: boolean
    navbarCollapsed: boolean
    isLoading: boolean
    isInitialized: boolean
    initializeApp: () => void
}

export const AppAPI: React.FC<AppAPIPropsTtype> = (props) => {
    return (
        <App
            isLoggedIn={props.isLoggedIn}
            navbarCollapsed={props.navbarCollapsed}
            isLoading={props.isLoading}
            isInitialized={props.isInitialized}
            initializeApp={props.initializeApp}
        />
    )
}

type MapStatePropsType = {
    isLoggedIn: boolean
    navbarCollapsed: boolean
    isLoading: boolean
    isInitialized: boolean
}
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        navbarCollapsed: state.app.navbarCollapsed,
        isLoading: state.app.isLoading,
        isInitialized: state.app.isInitialized
    }
}

export const AppContainer = compose(
    connect(mapStateToProps, { initializeApp })
)(AppAPI)
