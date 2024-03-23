import { compose } from 'redux'
import { connect } from 'react-redux'
import { memo, useEffect } from 'react'
import { AppRootStateType } from 'store/redux-store'
import { AuthStateType } from 'store/auth/authReducer'
import { selectIsLoading } from 'store/app/appSelectors'
import { selectAuthData } from 'store/auth/authSelectors'
import { AlertType, addAppAlert } from 'store/app/appReducer'
import { Profile } from 'components/layout/pages/profile/Profile'
import { selectProfileData } from 'store/profile/profileSelectors'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
    ChangeAboutProfileType, ProfileStateType, addPost,
    changeProfileAbout, changeProfileContacts,
    changeProfilePhotos,
    changeProfileStatus, followProfile, getProfileData,
    postOnChange, unfollowProfile
} from 'store/profile/profileReducer'
import { GetProfileResponseContactsType } from 'api/profileAPI'

const ProfileAPI: React.FC<ProfileAPIPropsType> = memo((props) => {
    const { id: authId } = props.authData
    const { userId } = props.match.params

    useEffect(() => {
        props.getProfileData(Number(userId ? userId : authId))
    }, [userId])

    return <Profile
        authStateData={props.authData}
        appIsLoading={props.appIsLoading}
        profileStateData={props.profileData}
        addPost={props.addPost}
        addAppAlert={props.addAppAlert}
        postOnChange={props.postOnChange}
        followProfile={props.followProfile}
        unfollowProfile={props.unfollowProfile}
        changeProfileAbout={props.changeProfileAbout}
        changeProfilePhotos={props.changeProfilePhotos}
        changeProfileStatus={props.changeProfileStatus}
        changeProfileContacts={props.changeProfileContacts}
    />
})

const mapStateToProps = (state: AppRootStateType) => {
    return {
        authData: selectAuthData(state),
        appIsLoading: selectIsLoading(state),
        profileData: selectProfileData(state),
    }
}

export const ProfileContainer = compose(
    connect(mapStateToProps,
        {
            postOnChange, addPost, getProfileData,
            unfollowProfile, followProfile, changeProfileStatus,
            addAppAlert, changeProfileContacts, changeProfileAbout,
            changeProfilePhotos
        })
)(withRouter(ProfileAPI))

//TYPES
type ConnectPropsType = {
    appIsLoading: boolean
    authData: AuthStateType
    profileData: ProfileStateType
    addPost: () => void
    postOnChange: (newPost: string) => void
    followProfile: (userId: number) => void
    getProfileData: (iserId: number) => void
    unfollowProfile: (userId: number) => void
    changeProfilePhotos: (image: File) => void
    changeProfileStatus: (newStatus: string) => void
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileAbout: (about: ChangeAboutProfileType) => void
    changeProfileContacts: (contacts: GetProfileResponseContactsType) => void
}
type PathParamType = {
    userId: string
}
type ProfileAPIPropsType = RouteComponentProps<PathParamType> & ConnectPropsType