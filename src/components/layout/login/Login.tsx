import React from "react"
import { BlockSection } from "../../micro/BlockSection.styled"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { BlockHeader } from "../../micro/BlockHeader.styled"
import { Input } from "../../micro/field/Input.styled"
import { FlexWrapper } from "../../micro/FlexWrapper.styled"
import { Button } from "../../micro/button/Button"

type LoginPagePropsType = {

}

export const Login: React.FC<LoginPagePropsType> = (props) => {
    return (
        <StyledLogin>
            <StyledSection id={'login'}>
                <BlockHeader>Log In</BlockHeader>
                <StyledForm>
                    <FlexWrapper direction={'column'} gap={'min(10px, 1vw)'}>
                        <label htmlFor={'email'}>Email</label>
                        <Input bordered={'true'} type={'email'} name={'email'} id={'email'} placeholder={'free@samuraijs.com'}/>
                    </FlexWrapper>
                    <FlexWrapper direction={'column'} gap={'min(10px, 1vw)'}>
                        <label htmlFor={'password'}>Password</label>
                        <Input bordered={'true'} type={'password'} name={'password'} id={'password'} placeholder={'free'}/>
                    </FlexWrapper>
                    <FlexWrapper gap={'min(10px, 1vw)'} align={'center'}>
                        <Input type={'checkbox'} name={'remember'} id={'remember'} />
                        <label htmlFor={'remember'}>Remember me</label>
                    </FlexWrapper>
                    <FlexWrapper justify={'center'}>
                        <Button variant={'primary'} type={'submit'} onClick={() => { }}>Sign in</Button>
                    </FlexWrapper>
                </StyledForm>
            </StyledSection>
        </StyledLogin>
    )
}

const StyledLogin = styled.main`
    display: flex;
    background-color: ${theme.color.background.primary};
    align-items: center;
    justify-content: center;
`
const StyledSection = styled(BlockSection)`
    display: flex;
    width: 35%;
    min-width: 320px;
    @media ${theme.media.mobile} {
        height: 100%;
        width: 100%;
    }
`
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: min(30px, 2vw);
    padding: min(30px, 2vw);
    @media ${theme.media.mobile} {
        background-color: ${theme.color.background.block};
        align-self: center;
        justify-self: center;
        height: 80%;
        width: 80%;
        justify-content: center;
    }
`
