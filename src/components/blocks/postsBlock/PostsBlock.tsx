import React, { ChangeEvent, MouseEvent, KeyboardEvent, useState } from "react"
import styled from "styled-components"
import { Button } from "../../micro/button/Button"
import { Input } from "../../micro/field/Input.styled"
import { FlexWrapper } from "../../micro/FlexWrapper.styled"
import { Post } from "./post/Post"
import { BlockHeader } from "../../micro/BlockHeader.styled"
import { BlockSection } from "../../micro/BlockSection.styled"
import { ProfileStateType } from "../../../redux/profileReducer"

type PostsBlockPropsType = {
    profileData: ProfileStateType
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
        if (props.profileData.newPostForm.trim() !== "") {
            props.addPost()
        } else {
            setError('Enter your post');
        }
    }

    const postsList = () => {
        return (
            <>
                {props.profileData.posts.map(post => <Post key={post.id} postData={post} />)}
            </>
        )
    }

    return (
        <BlockSection id="posts" >
            <BlockHeader>Posts</BlockHeader>
            <Form
                onKeyDown={addPostOnCtrlEnterHandler}
            >
                <Input
                    as={"textarea"}
                    aria-label="enter your post"
                    placeholder="Enter your post"
                    bordered={'true'}
                    value={props.profileData.newPostForm}
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