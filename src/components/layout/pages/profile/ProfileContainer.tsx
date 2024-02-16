import { connect } from "react-redux"
import { addPost, followProfile, setProfileData, postOnChangeAction, unfollowProfile, PostStateType, ProfileDataType } from "../../../../redux/profileReducer"
import { AppRootStateType } from "../../../../redux/redux-store"
import { Profile } from "./Profile"
import { useEffect } from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { RequestStatusType } from "../../../../redux/appReducer"

type ConnectPropsType = {
    posts: PostStateType[]
    profileData: ProfileDataType
    newPostForm: string
    appRequestStatus: RequestStatusType
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
        props.setProfileData(Number(props.match.params.userId) || 2)
    }, [props.match.params.userId])

    return <Profile addPost={props.addPost}
        appRequestStatus={props.appRequestStatus}
        followProfile={props.followProfile}
        profileData={props.profileData}
        newPostForm={props.newPostForm}
        postOnChangeAction={props.postOnChangeAction}
        posts={props.posts}
        unfollowProfile={props.unfollowProfile}
    />
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.profile.posts,
        profileData: state.profile.data,
        newPostForm: state.profile.newPostForm,
        appRequestStatus: state.app.requestStatus
    }
}

const mapDispatchToProps =
    { postOnChangeAction, addPost, setProfileData, unfollowProfile, followProfile }

let WithUrlDataContainerComponent = withRouter(ProfileAPI)

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent)