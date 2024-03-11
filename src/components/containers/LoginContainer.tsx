
import { LoginDataType } from 'api/social-network-api'
import { Login } from 'components/layout/login/Login'
import { memo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AlertType, addAppAlert } from 'store/app/appReducer'
import { login } from 'store/auth/authReducer'
import { selectIsloggedIn } from 'store/auth/authSelectors'
import { AppRootStateType } from 'store/redux-store'

export const LoginAPI: React.FC<LoginAPIPropsTtype> = memo((props) => {
    return (
        <Login
            isLoggedIn={props.isLoggedIn}
            login={props.login}
            addAppAlert={props.addAppAlert}
        />
    )
})

type MapStatePropsType = {
    isLoggedIn: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        isLoggedIn: selectIsloggedIn(state)
    }
}

export const LoginContainer = compose(
    connect(mapStateToProps, { login, addAppAlert })
)(LoginAPI)

//TYPES
type LoginAPIPropsTtype = {
    isLoggedIn: boolean
    login: (loginData: LoginDataType) => void
    addAppAlert: (type: AlertType, message: string) => void
}