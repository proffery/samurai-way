import App from 'App'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeApp } from 'store/app/appReducer'
import { selectNavbarCollapsed, selectIsLoading, selectIsInitialized } from 'store/app/appSelectors'
import { selectIsloggedIn } from 'store/auth/authSelectors'
import { AppRootStateType } from 'store/redux-store'

export const AppAPI = (props: AppAPIPropsType) => {
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

//TYPES
type AppAPIPropsType = {
    isLoggedIn: boolean
    navbarCollapsed: boolean
    isLoading: boolean
    isInitialized: boolean
    initializeApp: () => Promise<void>
}