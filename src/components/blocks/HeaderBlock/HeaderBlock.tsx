import React from "react"
import styled from "styled-components"
import { Button } from "../../micro/button/Button"
import { Icon } from "../../micro/icon/Icon"
import { theme } from "../../../styles/Theme.styled"
import { font } from "../../../styles/Font";
import { NavLink } from "react-router-dom"

type HeaderBlockPropsType = {
    userId: number
    className?: string
    photoLargeURL: string
    photoSmallURL: string
    fullName: string
    aboutMe: string
}

export const HeaderBlock: React.FC<HeaderBlockPropsType> = (props) => {
    return (
        <StyledHeaderBlock id="profile-header" className={props.className}>
            <BackgroundConainer>
                <BackgroundImage src={props.photoLargeURL} />
                <AvatarImage src={props.photoSmallURL} />
            </BackgroundConainer>
            <InfoConainer>
                <TextContainer>
                    <Name>{props.fullName}</Name>
                    <About>{props.aboutMe}</About>
                </TextContainer>
                <ButtonsContainer>
                    <MessagesButton
                        to={`/messages/${props.userId}`}
                    ><Icon iconId={'messages'} viewBox="-2 -3 24 24" /></MessagesButton>
                    <Button variant={'primary'}
                        name={'Follow'}
                        onClick={() => { }}
                    />
                </ButtonsContainer>
            </InfoConainer>
        </StyledHeaderBlock>
    )
}

const StyledHeaderBlock = styled.section`
    aspect-ratio: 19 / 7;
    display: flex;
    flex-direction: column;
`
const BackgroundConainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 70%;
`
const BackgroundImage = styled.img`
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
`
const AvatarImage = styled.img`
    position: absolute;
    top: 50%;
    left: 5%;
    width: 17%;
    border-radius: 50%;
`
const InfoConainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 30%;
`
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: ${theme.color.text.primary};
    padding-left: 50px;
`

const Name = styled.span`
    ${font({ weight: 700, Fmin: 20, Fmax: 30 })}
`

const About = styled.span`
    ${font({ weight: 100, Fmin: 10, Fmax: 22 })}
`

const ButtonsContainer = styled.div`
    display: flex;
    height: 40%;
    min-height: 30px;
    gap: 10px;
    button {
        display: flex;
        align-items: center;
    }
`
const MessagesButton = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50% 50%; 
    aspect-ratio: 1 / 1;
    padding: 0;
    background-color: ${theme.color.background.second};
    color: ${theme.color.text.second};
    border-width: 1px;
    border-style: solid;
    border-color: ${theme.color.background.second};
    svg {
        height: 50%;
        width: 50%;
    }
    &:active {
            background-color: ${theme.color.background.primary};
            color: ${theme.color.text.primary};
            border-color: ${theme.color.background.second};
        }
`