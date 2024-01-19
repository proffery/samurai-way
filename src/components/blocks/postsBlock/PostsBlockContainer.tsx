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
        postsData: state.profilePage
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