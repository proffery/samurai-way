import { useEffect } from 'react'
import { connect } from "react-redux"
import App from "./App"
import { initializeApp } from './redux/app/appReducer'
import { selectIsInitialized, selectIsLoading, selectNavbarCollapsed } from './redux/app/appSelectors'
import { AppRootStateType } from 'redux/redux-store'
import { selectIsloggedIn } from './redux/auth/authSelectors'

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
        isLoggedIn: selectIsloggedIn(state),
        navbarCollapsed: selectNavbarCollapsed(state),
        isLoading: selectIsLoading(state),
        isInitialized: selectIsInitialized(state)
    }
}

export const AppContainer = connect(mapStateToProps, { initializeApp })(AppAPI)

