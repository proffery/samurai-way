import { v1 } from "uuid"

export const ADD_POST = 'ADD-POST'
export const UPDATE_POST = 'UPDATE-POST'
export const ON_CHANGE_POST = 'ON-CHANGE-POST'

export type ProfileReducerActionsType = AddPostACType | UpdateNewPostACType | PostOnChangeACType

export type PostStateType = {
    id: string
    message: string
    likeCount: number
    commentsCount: number
}
export type FriendStateType = {
    id: number
    name: string
    second_name: string
}
export type ProfilePageStateType = {
    posts: PostStateType[]
    friends: FriendStateType[]
    newPostForm: string
}

const initialState: ProfilePageStateType = {
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
    friends: [
        {
            id: 1,
            name: 'Dimych',
            second_name: 'Incubator'
        },
        {
            id: 2,
            name: 'Anrew',
            second_name: 'Incubator'
        },
        {
            id: 3,
            name: 'Sveta',
            second_name: 'Incubator'
        },
        {
            id: 4,
            name: 'Sasha',
            second_name: 'Incubator'
        },
        {
            id: 5,
            name: 'Viktor',
            second_name: 'Incubator'
        },
        {
            id: 6,
            name: 'Dimych',
            second_name: 'Incubator'
        },
    ],
    newPostForm: ''
}

const profileReducer = (state: ProfilePageStateType = initialState, action: ProfileReducerActionsType): ProfilePageStateType => {
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