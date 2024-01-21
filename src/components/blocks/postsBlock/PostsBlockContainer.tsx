import { connect } from "react-redux"
import {
    PostsReducerActionsType,
    addPostAC,
    postOnChangeAC
} from "../../../redux/postsReducer"
import { PostsBlock } from "./PostsBlock"
import { AppRootStateType } from "../../../redux/redux-store"

const mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.posts.posts,
        newPostForm: state.posts.newPostForm
    }
}

const mapDispatchToProps = (dispatch: (action: PostsReducerActionsType) => void) => {
    return {
        onChangeNewPostText: (text: string) => {
            dispatch(postOnChangeAC(text))
        },
        addPost: () => {
            dispatch(addPostAC())
            dispatch(postOnChangeAC(''))
        }
    }
}

export const PostsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(PostsBlock)