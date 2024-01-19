import { connect } from "react-redux"
import {
    ProfileReducerActionsType,
    addPostAC,
    postOnChangeAC
} from "../../../redux/profileReducer"
import { PostsBlock } from "./PostsBlock"
import { AppRootStateType } from "../../../redux/redux-store"

const mapStateToProps = (state: AppRootStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostForm: state.profilePage.newPostForm
    }
}

const mapDispatchToProps = (dispatch: (action: ProfileReducerActionsType) => void) => {
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