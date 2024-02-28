import { connect } from "react-redux"
import { Header } from "./Header"
import { AppRootStateType } from "../../../redux/redux-store"
import { AuthStateType, logOut } from "../../../redux/authReducer"

type HeaderAPIPropsTtype = {
    authData: AuthStateType
    logOut: () => void
}

export const HeaderAPI: React.FC<HeaderAPIPropsTtype> = (props) => {
   
    return (
        <Header
            authData={props.authData}
            logOut={props.logOut}
        />
    )
}

type MapStatePropsType = {
    authData: AuthStateType
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        authData: state.auth
    }
}

export const HeaderContainer = connect(mapStateToProps, { logOut })(HeaderAPI)