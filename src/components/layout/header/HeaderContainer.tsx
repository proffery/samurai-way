import { connect } from "react-redux"
import { Header } from "./Header"
import { AppRootStateType } from "../../../redux/redux-store"
import { getPhotoUrl, logOut } from "../../../redux/authReducer"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

type HeaderAPIPropsTtype = {
    userId: number
    email: string,
    login: string
    isLoggedIn: boolean
    photoUrl: string
    getPhotoUrl: (userId: number) => void
    logOut: () => void
}

export const HeaderAPI: React.FC<HeaderAPIPropsTtype> = (props) => {
    const history = useHistory()
    useEffect(() => {
        props.isLoggedIn && props.getPhotoUrl(props.userId)
        props.isLoggedIn && history.push("/")
    }, [])
    return (
        <Header
            email={props.email}
            login={props.login}
            isLoggedIn={props.isLoggedIn}
            photoUrl={props.photoUrl}
            logout={props.logOut}
        />
    )
}

type MapStatePropsType = {
    userId: number
    email: string,
    login: string
    isLoggedIn: boolean
    photoUrl: string
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        userId: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isLoggedIn: state.auth.isLoggedIn,
        photoUrl: state.auth.photoUrl
    }
}

export const HeaderContainer = connect(mapStateToProps, {
    getPhotoUrl, logOut
})(HeaderAPI)