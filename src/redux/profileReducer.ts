import { v1 } from "uuid"
import { PostStateType, ProfilePageStateType } from "./state"

export const ADD_POST = 'ADD-POST'
export const UPDATE_POST = 'UPDATE-POST'
export const ON_CHANGE_POST = 'ON-CHANGE-POST'

export type ProfileReducerActionsType = AddPostACType | UpdateNewPostACType | PostOnChangeACType

const profileReducer = (state: ProfilePageStateType, action: ProfileReducerActionsType): ProfilePageStateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostStateType = {
                id: v1(),
                message: state.newPostForm,
                likeCount: 0,
                commentsCount: 0
            }
            return {
                ...state, posts: [newPost, ...state.posts]
            }
        }
        case UPDATE_POST: {
            return {
                ...state, posts: state.posts.map(el => el.id === action.payload.postId
                    ? { ...el, message: action.payload.newPost }
                    : el
                )
            }
        }
        case ON_CHANGE_POST: {
            return {
                ...state, newPostForm: action.payload.newPost
            }
        }
        default: return state
    }
}

type AddPostACType = ReturnType<typeof addPostAC>
export const addPostAC = () => {
    return {
        type: 'ADD-POST',
    } as const
}

type UpdateNewPostACType = ReturnType<typeof updatePostAC>
export const updatePostAC = (postId: string, newPost: string) => {
    return {
        type: 'UPDATE-POST',
        payload: {
            newPost,
            postId
        }
    } as const
}

type PostOnChangeACType = ReturnType<typeof postOnChangeAC>
export const postOnChangeAC = (newPost: string) => {
    return {
        type: 'ON-CHANGE-POST',
        payload: {
            newPost
        }
    } as const
}

export default profileReducer