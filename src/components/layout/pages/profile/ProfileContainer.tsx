import { connect } from "react-redux"
import { PostStateType, ProfileDataType, addPostTC, followFromProfile, getProfileDataTC, postOnChangeAC, unfollowFromProfile } from "../../../../redux/profileReducer"
import { AppRootStateType } from "../../../../redux/redux-store"
import { Profile } from "./Profile"
import { useEffect } from "react"
import { RequestStatusType } from "../../../../redux/appReducer"

type ProfileAPIPropsType = {
    posts: PostStateType[]
    newPostForm: string
    profileData: ProfileDataType
    appRequestStatus: RequestStatusType
    onChangeNewPostText: (text: string) => void
    addPost: () => void
    getProfile: (userId: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const ProfileAPI: React.FC<ProfileAPIPropsType> = (props) => {

    useEffect(() => {
        props.getProfile(2)
    }, [])

    return <Profile
        posts={props.posts}
        newPostForm={props.newPostForm}
        profileData={props.profileData}
        appRequestStatus={props.appRequestStatus}
        addPost={props.addPost}
        onChangeNewPostText={props.onChangeNewPostText}
        follow={props.follow}
        unfollow={props.unfollow}
    />
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.profile.posts,
        newPostForm: state.profile.newPostForm,
        profileData: state.profile.data,
        appRequestStatus: state.app.requestStatus
    }
}

export const ProfileContainer = connect(mapStateToProps, {
    onChangeNewPostText: postOnChangeAC,
    addPost: addPostTC,
    getProfile: getProfileDataTC,
    unfollow: unfollowFromProfile,
    follow: followFromProfile
})(ProfileAPI)