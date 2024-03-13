import { compose } from 'redux'
import { connect } from 'react-redux'
import { memo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AppRootStateType } from 'store/redux-store'
import { Header } from 'components/layout/header/Header'
import { selectAuthData } from 'store/auth/authSelectors'
import { selectStoragePath } from 'store/app/appSelectors'
import { setUsersSearchTerm } from 'store/users/usersReducer'
import { AuthStateType, logout } from 'store/auth/authReducer'
import { selectUsersSearchTerm } from 'store/users/usersSelectors'
import { AlertType, addAppAlert } from 'store/app/appReducer'

export const HeaderAPI: React.FC<HeaderAPIPropsTtype> = memo((props) => {
    const history = useHistory()

    useEffect(() => {
        if (props.searchTerm && history.location.pathname !== '/users') {
            history.push('/users')
        }
    }, [props.searchTerm])

    return (
        <Header
            logout={props.logout}
            authData={props.authData}
            searchTerm={props.searchTerm}
            addAppAlert={props.addAppAlert}
            setUsersSearchTerm={props.setUsersSearchTerm}
        />
    )
})


const mapStateToProps = (state: AppRootStateType) => {
    return {
        authData: selectAuthData(state),
        storagePath: selectStoragePath(state),
        searchTerm: selectUsersSearchTerm(state)
    }
}

export const HeaderContainer = compose(
    connect(mapStateToProps, { logout, setUsersSearchTerm, addAppAlert })
)(HeaderAPI)

//TYPES

type HeaderAPIPropsTtype = {
    searchTerm: string
    storagePath: string
    authData: AuthStateType
    logout: () => void
    setUsersSearchTerm: (searchTerm: string) => void
    addAppAlert: (type: AlertType, message: string) => void
}