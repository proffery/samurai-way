import { connect } from "react-redux"
import { addPost, followProfile, setProfileData, postOnChangeAction, unfollowProfile, PostStateType, ProfileDataType, ProfileStateType } from "../../../../redux/profileReducer"
import { AppRootStateType } from "../../../../redux/redux-store"
import { Profile } from "./Profile"
import { useEffect } from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { AuthStateType } from "../../../../redux/authReducer"

type ConnectPropsType = {
    authData: AuthStateType
    profileData: ProfileStateType
    appIsLoading: boolean
    addPost: () => void
    followProfile: (userId: number) => void
    unfollowProfile: (userId: number) => void
    postOnChangeAction: (newPost: string) => void
    setProfileData: (iserId: number) => void
}
type PathParamType = {
    userId: string
}
type ProfileAPIPropsType = RouteComponentProps<PathParamType> & ConnectPropsType

const ProfileAPI: React.FC<ProfileAPIPropsType> = (props) => {

    useEffect(() => {
        props.setProfileData(Number(props.match.params.userId
            ? props.match.params.userId
            : props.authData.id
        ))
    }, [props.match.params.userId])

    return <Profile
        authData={props.authData}
        profileData={props.profileData}
        appIsLoading={props.appIsLoading}
        addPost={props.addPost}
        followProfile={props.followProfile}
        postOnChangeAction={props.postOnChangeAction}
        unfollowProfile={props.unfollowProfile}
    />
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        authData: state.auth,
        profileData: state.profile,
        appIsLoading: state.app.isLoading
    }
}

const mapDispatchToProps =
    { postOnChangeAction, addPost, setProfileData, unfollowProfile, followProfile }

let WithUrlDataContainerComponent = withRouter(ProfileAPI)

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent)