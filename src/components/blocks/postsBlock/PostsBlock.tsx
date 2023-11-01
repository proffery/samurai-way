import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { Button } from "../../button/Button"
import { Field } from "../../field/Field.styled"
import { FlexWrapper } from "../../FlexWrapper"
import { Post } from "./post/Post"
import { PostStateType } from "../../../redux/state"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"

type PostsBlockPropsType = {
    className?: string
    postsData: PostStateType[]
}

export const PostsBlock: React.FC<PostsBlockPropsType> = (props) => {

    const sendButtonHandler = () => {
        alert('SendPost')
    }

    return (
        <PostsBlockSection id="posts" className={props.className}>
            <BlockHeader>Posts</BlockHeader>
            <Form>
                <Field 
                    as={"textarea"} 
                    aria-label="enter your post" 
                    placeholder="Enter your post" 
                    bordered={'true'}
                />
                <FlexWrapper>
                    <Button 
                        type={'submit'} 
                        button_style={'primary'} 
                        callback={sendButtonHandler}
                        name={'Send'}
                    />
                </FlexWrapper>
            </Form>
            <PostsList postsData={props.postsData} />
        </PostsBlockSection>
    )
}

const PostsBlockSection = styled(BlockSection)`
position: relative;
    &::before {
        position: absolute;
        content: "";
        height: 1px;
        width: 100%;
        left: 0;
        top: 80px;
        background-color: ${theme.color.background.primary};
        @media ${theme.media.mobile} {
            top: 60px;
        }
    }
`

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
            {props.postsData.map(post => <Post key={post.id} postData={post}/>)}
        </>
    )
}