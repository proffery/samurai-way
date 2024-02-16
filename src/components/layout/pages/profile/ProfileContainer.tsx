import { connect } from "react-redux"
import { addPost, followProfile, setProfileData, postOnChangeAction, unfollowProfile } from "../../../../redux/profileReducer"
import { AppRootStateType } from "../../../../redux/redux-store"
import { Profile } from "./Profile"
import { useEffect } from "react"
import { RouteComponentProps, useParams, withRouter } from "react-router-dom"

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = typeof mapDispatchToProps
type OwnPropsType = MapStatePropsType & MapDispatchPropsType
type PathParamType = {
    userId: string
}
type CommonPropsType = RouteComponentProps<PathParamType> & OwnPropsType

const ProfileAPI: React.FC<CommonPropsType> = (props) => {

    let { userId } = useParams<PathParamType>()

    useEffect(() => {
        props.setProfileData(Number(userId) || 2)
    }, [userId])

    return <Profile {...props} />
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

//const WithUrlDataContainerComponent = withRouter(ProfileAPI)

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileAPI)

//export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent)