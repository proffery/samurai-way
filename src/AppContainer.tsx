import { useEffect } from 'react'
import { connect } from "react-redux"
import App from "./App"
import { initializeApp } from './redux/appReducer'
import { AppRootStateType } from "./redux/redux-store"

type AppAPIPropsTtype = {
    isLoggedIn: boolean
    navbarCollapsed: boolean
    isLoading: boolean
    isInitialized: boolean
    initializeApp: () => Promise<void>
}

export const AppAPI = (props: AppAPIPropsTtype) => {
    useEffect(() => {
        props.initializeApp()
    }, [])
    return (
        <App
            isLoggedIn={props.isLoggedIn}
            navbarCollapsed={props.navbarCollapsed}
            isLoading={props.isLoading}
            isInitialized={props.isInitialized}
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

export const AppContainer = connect(mapStateToProps, { initializeApp })(AppAPI)

