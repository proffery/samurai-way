import { connect } from "react-redux"
import { AppRootStateType } from "../../../redux/redux-store"
import { logIn } from "../../../redux/authReducer"
import { LoginDataType } from "../../../api/social-network-api"
import { AlertType, addAppAlert } from "../../../redux/appReducer"
import { Login } from "./Login"
import { compose } from "redux"

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
        isLoggedIn: state.auth.isLoggedIn
    }
}

export const LoginContainer = compose(
    connect(mapStateToProps, { logIn, addAppAlert })
)(LoginAPI)