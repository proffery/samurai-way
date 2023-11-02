import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { Button } from "../../micro/button/Button"
import { Field } from "../../micro/field/Field.styled"
import { FlexWrapper } from "../../micro/FlexWrapper"
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
                        onClick={sendButtonHandler}
                        name={'Send'}
                    />
                </FlexWrapper>
            </Form>
            <PostsList postsData={props.postsData} />
        </PostsBlockSection>
    )
}

const PostsBlockSection = styled(BlockSection)`

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