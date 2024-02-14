import { connect } from "react-redux"
import { addPostTC, postOnChangeAC } from "../../../redux/postsReducer"
import { PostsBlock } from "./PostsBlock"
import { AppRootStateType } from "../../../redux/redux-store"

const mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.posts.posts,
        newPostForm: state.posts.newPostForm
    }
}

export const PostsBlockContainer = connect(mapStateToProps, {
    onChangeNewPostText: postOnChangeAC,
    addPost: addPostTC
})(PostsBlock)