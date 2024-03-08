import styled from "styled-components"
import { BlockSection } from "../../../micro/BlockSection.styled"
import { BlockHeader } from "../../../micro/BlockHeader.styled"
import { FlexWrapper } from "../../../micro/FlexWrapper.styled"
import { Button } from "../../../micro/button/Button"
import { useHistory } from "react-router-dom"
import React, { memo } from "react"
import {font} from '../../../../styles/Font'

export const NotFound: React.FC = memo((props) => {
    const history = useHistory()

    const handleHome = () => {
        history.push("/")
    }
    
    const handleBack = () => {
        history.goBack()
    }

    return (
        <StyledNotFound id='404'>
            <StyledBlockSection>
                <BlockHeader>Error 404</BlockHeader>
                <TextWrapper>
                    <h3>Page Not Found</h3>
                    <StyledText>The page you are looking for doesn't exist. Here are some helpful links:</StyledText>
                    <FlexWrapper gap="min(30px, 2vw)" wrap={'wrap'} justify={'center'}>
                        <Button variant={'outlined'} onClick={handleBack}>← Back</Button>
                        <Button variant={'primary'} onClick={handleHome}>Go home</Button>
                    </FlexWrapper>
                </TextWrapper>
            </StyledBlockSection>
        </StyledNotFound>
    )
})

const StyledNotFound = styled.main`
    
`
const StyledBlockSection = styled(BlockSection)`
    height: 100%;
    
`
const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: center;
    align-self: center;
    justify-content: center;
    height: 100%;
    width: 55%;
    gap: min(30px, 2vw);
`
const StyledText = styled.p`
    width: 50%;
    text-align: left;
    ${font({weight: 400, Fmin: 10, Fmax: 16})}
`
