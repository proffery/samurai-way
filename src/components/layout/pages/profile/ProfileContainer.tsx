import { useEffect } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { compose } from "redux"
import { GetProfileResponseContactsType } from '../../../../api/social-network-api'
import { AlertType, addAppAlert } from "../../../../redux/appReducer"
import { AuthStateType } from "../../../../redux/authReducer"
import {
    AboutProfileType,
    ProfileStateType,
    addPost,
    changeProfileAbout,
    changeProfileContacts,
    changeProfileStatus,
    followProfile, getProfileData,
    postOnChange,
    unfollowProfile
} from "../../../../redux/profileReducer"
import { AppRootStateType } from "../../../../redux/redux-store"
import { Profile } from "./Profile"

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

const ProfileAPI: React.FC<ProfileAPIPropsType> = (props) => {

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
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        authData: state.auth,
        profileData: state.profile,
        appIsLoading: state.app.isLoading
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