import App from 'App'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppRootStateType } from 'store/redux-store'
import { selectIsloggedIn } from 'store/auth/authSelectors'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { initializeApp, savePathToStorage } from 'store/app/appReducer'
import {
    selectNavbarCollapsed, selectAppIsLoading, selectIsInitialized,
    selectStoragePath
} from 'store/app/appSelectors'

export const AppAPI = (props: AppAPIPropsType) => {
    const { pathname } = props.location
    const { initializeApp, savePathToStorage } = props
    useEffect(() => {
        initializeApp()
    }, [])

    useEffect(() => {
        pathname !== '/login' && savePathToStorage(pathname)
    }, [pathname])


    return (
        <App
            isLoggedIn={props.isLoggedIn}
            navbarCollapsed={props.navbarCollapsed}
            isLoading={props.isLoading}
            isInitialized={props.isInitialized}
            storagePath={props.storagePath}
        />
    )
}


const mapStateToProps = (state: AppRootStateType) => {
    return {
        isLoggedIn: selectIsloggedIn(state),
        navbarCollapsed: selectNavbarCollapsed(state),
        isLoading: selectAppIsLoading(state),
        isInitialized: selectIsInitialized(state),
        storagePath: selectStoragePath(state)
    }
}

export const AppContainer = connect(
    mapStateToProps,
    { initializeApp, savePathToStorage }
)(withRouter(AppAPI))

//TYPES
type ConnectPropsType = {
    isLoggedIn: boolean
    navbarCollapsed: boolean
    isLoading: boolean
    storagePath: string
    isInitialized: boolean
    initializeApp: () => void
    savePathToStorage: (currentPatch: string) => void
}

type AppAPIPropsType = ConnectPropsType & RouteComponentProps