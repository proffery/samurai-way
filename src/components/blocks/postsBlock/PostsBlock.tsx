import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { font } from "../../../styles/Font"
import { Button } from "../../button/Button"
import { Field } from "../../field/Field.styled"
import { FlexWrapper } from "../../FlexWrapper"

type PostsBlockPropsType = {
    className?: string
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
                    <StyledButton 
                        type={'submit'} 
                        button_style={'primary'} 
                        name={'Send'} 
                        callback={sendButtonHandler}
                    />
                </FlexWrapper>
            </Form>

        </StyledPostsBlock>
    )
}

const StyledPostsBlock = styled.section`
    display: flex;
    flex-direction: column;
    color: ${theme.color.text.primary_dark};
    padding: 40px 46px 0;
    height: fit-content;
`

const Header = styled.h2`
    color: ${theme.color.text.primary};
    ${font({weight: 700, Fmin: 14, Fmax: 26})}
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StyledButton = styled(Button)`
    padding: 12px 24px;
`