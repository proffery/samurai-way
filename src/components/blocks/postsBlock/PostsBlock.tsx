import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { font } from "../../../styles/Font"
import { Button } from "../../button/Button"
import { Field } from "../../field/Field.styled"
import { FlexWrapper } from "../../FlexWrapper"
import { Post } from "./post/Post"
import { PostStateType } from "../../../redux/state"

type PostsBlockPropsType = {
    className?: string
    postsData: PostStateType[]
}

export const PostsBlock: React.FC<PostsBlockPropsType> = (props) => {

    const sendButtonHandler = () => {
        alert('SendPost')
    }

    return (
        <StyledPostsBlock id="posts" className={props.className}>
            <Header>Posts</Header>
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
        </StyledPostsBlock>
    )
}

const StyledPostsBlock = styled.section`
position: relative;
    display: flex;
    flex-direction: column;
    color: ${theme.color.text.primary_dark};
    padding: 40px 48px 0px ;
    height: fit-content;
    gap: 20px;
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
    @media ${theme.media.mobile} {
        padding: 27px 16px 0;
    }
`

const Header = styled.h2`
    color: ${theme.color.text.primary};
    ${font({weight: 700, Fmin: 14, Fmax: 26})}
    margin-bottom: 20px;
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
        <StyledPostList>
            {props.postsData.map(post => <Post key={post.id} postData={post}/>)}
        </StyledPostList>
    )
}

const StyledPostList = styled.div`
    /* overflow-y: auto; */
`