
import { memo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { login } from 'store/auth/authReducer'
import { AppRootStateType } from 'store/redux-store'
import { Login } from 'components/layout/login/Login'
import { selectIsloggedIn } from 'store/auth/authSelectors'
import { AlertType, addAppAlert } from 'store/app/appReducer'
import { LoginDataType } from 'api/authAPI'

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