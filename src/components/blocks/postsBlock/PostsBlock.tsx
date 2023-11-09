import React, { ChangeEvent, FormEvent, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "../../micro/button/Button"
import { Field } from "../../micro/field/Field.styled"
import { FlexWrapper } from "../../micro/FlexWrapper"
import { Post } from "./post/Post"
import { PostStateType, ProfilePageStateType } from "../../../redux/state"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"

type PostsBlockPropsType = {
    className?: string
    postsData: ProfilePageStateType
    addPost: () => void
    newPostChange: (postMessage: string) => void
}

export const PostsBlock: React.FC<PostsBlockPropsType> = (props) => {

    const onChangeNewPostHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.newPostChange(e.currentTarget.value)
    }

    const addPostHandler = (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement> | undefined) => {
        if (e) {
            e.preventDefault()
        }
        props.addPost()
    }

    return (
        <BlockSection id="posts" className={props.className}>
            <BlockHeader>Posts</BlockHeader>
            <Form onSubmit={addPostHandler}>
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
                        onClick={addPostHandler}
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