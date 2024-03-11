import { memo, useEffect } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { compose } from "redux"
import { Profile } from "../layout/pages/profile/Profile"
import { selectIsLoading } from 'store/app/appSelectors'
import { selectAuthData } from 'redux/auth/authSelectors'
import { AuthStateType } from 'redux/auth/authReducer'
import {
    AboutProfileType, ProfileStateType, addPost,
    changeProfileAbout, changeProfileContacts,
    changeProfileStatus, followProfile, getProfileData,
    postOnChange, unfollowProfile
} from 'store/profile/profileReducer'
import { AlertType, addAppAlert } from 'store/app/appReducer'
import { GetProfileResponseContactsType } from 'api/social-network-api'
import { AppRootStateType } from 'store/redux-store'
import { selectProfileData } from 'store/profile/profileSelectors'

type ConnectPropsType = {
    authData: AuthStateType
    profileData: ProfileStateType
    appIsLoading: boolean
    addPost: () => void
    followProfile: (userId: number) => void
    unfollowProfile: (userId: number) => void
    postOnChange: (newPost: string) => void
    getProfileData: (iserId: number) => void
    changeProfileStatus: (newStatus: string) => void
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileContacts: (contacts: GetProfileResponseContactsType) => void
    changeProfileAbout: (about: AboutProfileType) => void
}
type PathParamType = {
    userId: string
}
type ProfileAPIPropsType = RouteComponentProps<PathParamType> & ConnectPropsType

const ProfileAPI: React.FC<ProfileAPIPropsType> = memo((props) => {

    useEffect(() => {
        props.getProfileData(Number(props.match.params.userId
            ? props.match.params.userId
            : props.authData.id
        ))
    }, [props.match.params.userId])

    return <Profile
        authStateData={props.authData}
        profileStateData={props.profileData}
        appIsLoading={props.appIsLoading}
        addPost={props.addPost}
        followProfile={props.followProfile}
        postOnChange={props.postOnChange}
        unfollowProfile={props.unfollowProfile}
        changeProfileStatus={props.changeProfileStatus}
        changeProfileContacts={props.changeProfileContacts}
        changeProfileAbout={props.changeProfileAbout}
        addAppAlert={props.addAppAlert}
    />
})

const mapStateToProps = (state: AppRootStateType) => {
    return {
        authData: selectAuthData(state),
        profileData: selectProfileData(state),
        appIsLoading: selectIsLoading(state)
    }
}

export const ProfileContainer = compose(
    connect(mapStateToProps,
        {
            postOnChange, addPost, getProfileData,
            unfollowProfile, followProfile, changeProfileStatus,
            addAppAlert, changeProfileContacts, changeProfileAbout
        })
)(withRouter(ProfileAPI))