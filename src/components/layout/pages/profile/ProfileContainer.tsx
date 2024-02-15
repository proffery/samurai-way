import { connect } from "react-redux"
import { PostStateType, ProfileStateType, addPostTC, getProfileDataTC, postOnChangeAC } from "../../../../redux/profileReducer"
import { AppRootStateType } from "../../../../redux/redux-store"
import { Profile } from "./Profile"
import { useEffect } from "react"
import { GetProfileResponseType } from "../../../../api/social-network-api"

type ProfileAPIPropsType = {
    posts: PostStateType[]
    newPostForm: string
    profileData: GetProfileResponseType
    onChangeNewPostText: (text: string) => void
    addPost: () => void
    getProfile: (userId: number) => void
}

const ProfileAPI: React.FC<ProfileAPIPropsType> = (props) => {

    useEffect(() => {
        props.getProfile(2)
    }, [])

    return <Profile
        posts={props.posts}
        newPostForm={props.newPostForm}
        addPost={props.addPost}
        profileData={props.profileData}
        onChangeNewPostText={props.onChangeNewPostText}
    />
}

const mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.profile.posts,
        newPostForm: state.profile.newPostForm,
        profileData: state.profile.data
    }
}

export const ProfileContainer = connect(mapStateToProps, {
    onChangeNewPostText: postOnChangeAC,
    addPost: addPostTC,
    getProfile: getProfileDataTC
})(ProfileAPI)