import { connect } from "react-redux"
import { Header } from "./Header"
import { AppRootStateType } from "../../../redux/redux-store"
import { AuthStateType, logOut } from "../../../redux/auth/authReducer"
import { compose } from "redux"
import { selectAuthData } from 'redux/auth/authSelectors'

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
        authData: selectAuthData(state)
    }
}

export const HeaderContainer = compose(
    connect(mapStateToProps, { logOut })
)(HeaderAPI)