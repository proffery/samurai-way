import { Header } from 'components/layout/header/Header'
import { memo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AuthStateType, logout } from 'store/auth/authReducer'
import { selectAuthData } from 'store/auth/authSelectors'
import { AppRootStateType } from 'store/redux-store'

export const HeaderAPI: React.FC<HeaderAPIPropsTtype> = memo((props) => {
    return (
        <Header
            authData={props.authData}
            logout={props.logout}
        />
    )
})

type MapStatePropsType = {
    authData: AuthStateType
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        authData: selectAuthData(state)
    }
}

export const HeaderContainer = compose(
    connect(mapStateToProps, { logout })
)(HeaderAPI)

//TYPES
type HeaderAPIPropsTtype = {
    authData: AuthStateType
    logout: () => void
}