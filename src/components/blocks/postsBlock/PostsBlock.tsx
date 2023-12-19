import React, { ChangeEvent, MouseEvent, KeyboardEvent } from "react"
import styled from "styled-components"
import { Button } from "../../micro/button/Button"
import { Field } from "../../micro/field/Field.styled"
import { FlexWrapper } from "../../micro/FlexWrapper"
import { Post } from "./post/Post"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { PostStateType, ProfilePageStateType, ProfileReducerActionsType, addPostAC, postOnChangeAC } from "../../../redux/profileReducer"

type PostsBlockPropsType = {
    className?: string
    postsData: ProfilePageStateType
    dispatch: (action: ProfileReducerActionsType) => void
}

export const PostsBlock: React.FC<PostsBlockPropsType> = (props) => {

    const onChangeNewPostHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(postOnChangeAC(e.currentTarget.value))
    }

    const addPostOnCtrlEnterHandler = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            props.dispatch(addPostAC())
            props.dispatch(postOnChangeAC(''))
        }
    }

    const addPostOnClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        props.dispatch(addPostAC())
        props.dispatch(postOnChangeAC(''))
    }

    return (
        <BlockSection id="posts" className={props.className}>
            <BlockHeader>Posts</BlockHeader>
            <Form
                onKeyDown={addPostOnCtrlEnterHandler}
            >
                <Field
                    as={"textarea"}
                    aria-label="enter your post"
                    placeholder="Enter your post"
                    bordered={'true'}
                    value={props.postsData.newPostForm}
                    onChange={onChangeNewPostHandler}
                />
                <FlexWrapper>
                    <Button
                        type={'submit'}
                        button_style={'primary'}
                        name={'Send'}
                        onClick={addPostOnClickHandler}
                    />
                </FlexWrapper>
            </Form>
            <PostsList postsData={props.postsData.posts} />
        </BlockSection>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    textarea {
        min-height: 70px;
    }
`
type PostsListPropsType = {
    postsData: PostStateType[]
}

const PostsList: React.FC<PostsListPropsType> = (props) => {
    return (
        <>
            {props.postsData.map(post => <Post key={post.id} postData={post} />)}
        </>
    )
}