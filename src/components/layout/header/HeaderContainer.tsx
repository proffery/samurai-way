import { connect } from "react-redux"
import { Header } from "./Header"
import { AppRootStateType } from "../../../redux/redux-store"
import { getAuthUserData, logout } from "../../../redux/authReducer"
import { useEffect } from "react"

type HeaderAPIPropsTtype = {
    email: string,
    login: string
    isLoggedIn: boolean
    photoUrl: string
    getAuthUserData: () => void
    logout: () => void
}

export const HeaderAPI: React.FC<HeaderAPIPropsTtype> = (props) => {
    useEffect(() => {
        props.getAuthUserData()
    }, [])
    return (
        <Header
            email={props.email}
            login={props.login}
            isLoggedIn={props.isLoggedIn}
            photoUrl={props.photoUrl}
            logout={props.logout}
        />
    )
}

type MapStatePropsType = {
    email: string,
    login: string
    isLoggedIn: boolean
    photoUrl: string
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        email: state.auth.email,
        login: state.auth.login,
        isLoggedIn: state.auth.isLoggedIn,
        photoUrl: state.auth.photoUrl
    }
}

export const HeaderContainer = connect(mapStateToProps, {
    getAuthUserData, logout
})(HeaderAPI)