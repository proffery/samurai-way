import {
    ProfilePageStateType,
    ProfileReducerActionsType,
    addPostAC,
    postOnChangeAC
} from "../../../redux/profileReducer"
import { PostsBlock } from "./PostsBlock"

type PostsBlockPropsType = {
    postsData: ProfilePageStateType
    dispatch: (action: ProfileReducerActionsType) => void
}

export const PostsBlockContainer: React.FC<PostsBlockPropsType> = (props) => {

    const onChangeNewPostHandler = (text: string) => {
        props.dispatch(postOnChangeAC(text))
    }

    const addPost = () => {
        props.dispatch(addPostAC())
        props.dispatch(postOnChangeAC(''))
    }

    return (
        <PostsBlock
            postsData={props.postsData}
            onChangeNewPostText={onChangeNewPostHandler}
            addPost={addPost}
        />
    )
}