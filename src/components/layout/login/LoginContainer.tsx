import { connect } from "react-redux"
import { AppRootStateType } from "../../../redux/redux-store"
import { logIn } from "../../../redux/auth/authReducer"
import { LoginDataType } from "../../../api/social-network-api"
import { AlertType, addAppAlert } from "../../../redux/app/appReducer"
import { Login } from "./Login"
import { compose } from "redux"
import { selectIsloggedIn } from 'redux/auth/authSelectors'

type LoginAPIPropsTtype = {
    isLoggedIn: boolean
    logIn: (loginData: LoginDataType) => void
    addAppAlert: (type: AlertType, message: string) => void
}

export const LoginAPI: React.FC<LoginAPIPropsTtype> = (props) => {
    return (
        <Login
            isLoggedIn={props.isLoggedIn}
            logIn={props.logIn}
            addAppAlert={props.addAppAlert}
        />
    )
}

type MapStatePropsType = {
    isLoggedIn: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        isLoggedIn: selectIsloggedIn(state)
    }
}

export const LoginContainer = compose(
    connect(mapStateToProps, { logIn, addAppAlert })
)(LoginAPI)