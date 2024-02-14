import { Dispatch } from "redux"
import { v1 } from "uuid"

export const ADD_POST = 'ADD-POST'
export const UPDATE_POST = 'UPDATE-POST'
export const ON_CHANGE_POST = 'ON-CHANGE-POST'

export type PostsReducerActionsType = AddPostACType | UpdateNewPostACType | PostOnChangeACType

export type PostStateType = {
    id: string
    message: string
    likeCount: number
    commentsCount: number
}

export type PostsStateType = {
    posts: PostStateType[]
    newPostForm: string
}

const initialState: PostsStateType = {
    posts: [
        {
            id: v1(),
            message: 'Hi',
            likeCount: 10,
            commentsCount: 20
        },
        {
            id: v1(),
            message: 'How are you?',
            likeCount: 4,
            commentsCount: 1
        },
        {
            id: v1(),
            message: 'Yo',
            likeCount: 7,
            commentsCount: 2
        },
        {
            id: v1(),
            message: 'Samurai way!',
            likeCount: 12,
            commentsCount: 1
        },
        {
            id: v1(),
            message: 'Bye-bye!',
            likeCount: 1,
            commentsCount: 0
        },
    ],

    newPostForm: ''
}

export const postsReducer = (state: PostsStateType = initialState, action: PostsReducerActionsType): PostsStateType => {
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
        type: ADD_POST,
    } as const
}

type UpdateNewPostACType = ReturnType<typeof updatePostAC>
export const updatePostAC = (postId: string, newPost: string) => {
    return {
        type: UPDATE_POST,
        payload: {
            newPost,
            postId
        }
    } as const
}

type PostOnChangeACType = ReturnType<typeof postOnChangeAC>
export const postOnChangeAC = (newPost: string) => {
    return {
        type: ON_CHANGE_POST,
        payload: {
            newPost
        }
    } as const
}

export const addPostTC = () => (dispatch: Dispatch) => {
    dispatch(addPostAC())
    dispatch(postOnChangeAC(''))
}