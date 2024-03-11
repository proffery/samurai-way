import { GetProfileResponseContactsType } from 'api/social-network-api'
import { Profile } from 'components/layout/pages/profile/Profile'
import { memo, useEffect } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { compose } from "redux"
import { AlertType, addAppAlert } from 'store/app/appReducer'
import { selectIsLoading } from 'store/app/appSelectors'
import { AuthStateType } from 'store/auth/authReducer'
import { selectAuthData } from 'store/auth/authSelectors'
import {
    ChangeAboutProfileType, ProfileStateType, addPost,
    changeProfileAbout, changeProfileContacts,
    changeProfileStatus, followProfile, getProfileData,
    postOnChange, unfollowProfile
} from 'store/profile/profileReducer'
import { selectProfileData } from 'store/profile/profileSelectors'
import { AppRootStateType } from 'store/redux-store'


const ProfileAPI: React.FC<ProfileAPIPropsType> = memo((props) => {
    const { id: authId } = props.authData
    const { userId } = props.match.params

    useEffect(() => {
        props.getProfileData(Number(userId ? userId : authId))
    }, [userId])

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


//TYPES
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
    changeProfileAbout: (about: ChangeAboutProfileType) => void
}
type PathParamType = {
    userId: string
}
type ProfileAPIPropsType = RouteComponentProps<PathParamType> & ConnectPropsType