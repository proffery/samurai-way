import { connect } from "react-redux"

import App from "./App"
import { initializeApp } from "./redux/authReducer"
import { AppRootStateType } from "./redux/redux-store"

type AppAPIPropsTtype = {
    isLoggedIn: boolean
    navbarCollapsed: boolean
    isLoading: boolean
    initializeApp: () => void
}

export const AppAPI: React.FC<AppAPIPropsTtype> = (props) => {

    return (
        <App
            isLoggedIn={props.isLoggedIn}
            navbarCollapsed={props.navbarCollapsed}
            isLoading={props.isLoading}
            initializeApp={props.initializeApp}
        />
    )
}

type MapStatePropsType = {
    isLoggedIn: boolean
    navbarCollapsed: boolean
    isLoading: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        navbarCollapsed: state.app.navbarCollapsed,
        isLoading: state.app.isLoading
    }
}

export const AppContainer = connect(mapStateToProps, { initializeApp })(AppAPI)