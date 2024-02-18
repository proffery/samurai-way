import React, { ChangeEvent, MouseEvent, KeyboardEvent, useState } from "react"
import styled from "styled-components"
import { Button } from "../../micro/button/Button"
import { Field } from "../../micro/field/Field.styled"
import { FlexWrapper } from "../../micro/FlexWrapper.styled"
import { Post } from "./post/Post"
import { BlockHeader } from "../../micro/BlockHeader.styled"
import { BlockSection } from "../../micro/BlockSection.styled"
import { PostStateType } from "../../../redux/profileReducer"

type PostsBlockPropsType = {
    newPostForm: string
    posts: PostStateType[]
    onChangeNewPostText: (text: string) => void
    addPost: () => void
}

export const PostsBlock: React.FC<PostsBlockPropsType> = (props) => {

    let [error, setError] = useState<string | null>('Enter your post')

    const onChangeNewPostHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeNewPostText(e.currentTarget.value)
    }

    const addPostOnCtrlEnterHandler = (e: KeyboardEvent<HTMLFormElement>) => {
        if (error) setError(null)
        if (e.key === 'Enter' && e.ctrlKey) {
            addPost()
        }
    }

    const addPostOnClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (error) setError(null)
        addPost()
    }

    const addPost = () => {
        if (props.newPostForm.trim() !== "") {
            props.addPost()
        } else {
            setError('Enter your post');
        }
    }

    const postsList = () => {
        return (
            <>
                {props.posts.map(post => <Post key={post.id} postData={post} />)}
            </>
        )
    }

    return (
        <BlockSection id="posts" >
            <BlockHeader>Posts</BlockHeader>
            <Form
                onKeyDown={addPostOnCtrlEnterHandler}
            >
                <Field
                    as={"textarea"}
                    aria-label="enter your post"
                    placeholder="Enter your post"
                    bordered={'true'}
                    value={props.newPostForm}
                    onChange={onChangeNewPostHandler}
                />
                <FlexWrapper>
                    <Button
                        type={'submit'}
                        variant={'primary'}
                        disabled={!!error}
                        onClick={addPostOnClickHandler}
                    >{'Send'}</Button>
                </FlexWrapper>
            </Form>
            {postsList()}
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