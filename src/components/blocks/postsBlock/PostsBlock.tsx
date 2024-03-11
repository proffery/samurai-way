import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { BlockSection } from 'components/blocks/BlockSection.styled'
import { Post } from 'components/blocks/postsBlock/post/Post'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Button } from 'components/common/button/Button'
import { Input } from 'components/common/input/Input.styled'
import React, { ChangeEvent, MouseEvent, KeyboardEvent, useState, memo } from "react"
import { ProfileStateType } from 'store/profile/profileReducer'
import styled from 'styled-components'

type PostsBlockPropsType = {
    className?: string
    profileStateData: ProfileStateType
    onChangeNewPostText: (text: string) => void
    addPost: () => void
}

export const PostsBlock: React.FC<PostsBlockPropsType> = memo((props) => {

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
        if (props.profileStateData.newPostForm.trim() !== "") {
            props.addPost()
        } else {
            setError('Enter your post')
        }
    }

    const postsList = () => {
        return (
            <>
                {props.profileStateData.posts.map(post => <Post key={post.id} postData={post} />)}
            </>
        )
    }

    return (
        <StyledPosts id="posts" className={props.className} >
            <BlockHeader>Posts</BlockHeader>
            <Form
                onKeyDown={addPostOnCtrlEnterHandler}
            >
                <Input
                    as={"textarea"}
                    aria-label="enter your post"
                    placeholder="Enter your post"
                    bordered={'true'}
                    value={props.profileStateData.newPostForm}
                    onChange={onChangeNewPostHandler}
                />
                <FlexWrapper>
                    <Button
                        type={'submit'}
                        variant={'primary'}
                        disabled={!!error}
                        onClick={addPostOnClickHandler}
                        ariaLabel={'Submit button'}
                    >{'Send'}</Button>
                </FlexWrapper>
            </Form>
            {postsList()}
        </StyledPosts>
    )
})

const StyledPosts = styled(BlockSection)`
    display: flex;
    width: 100%;
    height: fit-content;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    textarea {
        min-height: 70px;
    }
`