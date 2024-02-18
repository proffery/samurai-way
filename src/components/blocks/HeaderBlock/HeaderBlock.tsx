import React from "react"
import styled from "styled-components"
import { Button } from "../../micro/button/Button"
import { Icon } from "../../micro/icon/Icon"
import { theme } from "../../../styles/Theme.styled"
import { font } from "../../../styles/Font";
import { NavLink } from "react-router-dom"
import { RequestStatusType } from "../../../redux/appReducer"
import defaultAvatar from '../../../assets/images/avatar-default.svg'

type HeaderBlockPropsType = {
    userId: number
    className?: string
    photoLargeURL: string
    photoSmallURL: string
    fullName: string
    aboutMe: string
    isFollow: boolean
    appRequestStatus: RequestStatusType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


export const HeaderBlock: React.FC<HeaderBlockPropsType> = (props) => {
    const followOnClickHandler = () => {
        props.isFollow ? props.unfollow(props.userId) : props.follow(props.userId)
    }
    return (
        <StyledHeaderBlock id="profile-header" className={props.className}>
            <BackgroundConainer>
                {props.photoLargeURL
                    ? <BackgroundImage src={props.photoLargeURL} />
                    : <Icon iconId={'avatarDefault'} viewBox="0 0 1024 1024" height={'100%'} width={'100%'} />}
                {props.photoSmallURL
                    ? <AvatarImage src={props.photoSmallURL} />
                    : <DefaultAvatar iconId={'avatarDefault'} viewBox="0 0 1024 1024" height={'100%'} width={'100%'} />}
            </BackgroundConainer>
            <InfoConainer>
                <TextContainer>
                    <Name>{props.fullName}</Name>
                    <About>{props.aboutMe}</About>
                </TextContainer>
                <ButtonsContainer>
                    <MessagesButton
                        to={`/messages/${props.userId}`}
                    ><Icon iconId={'messages'} viewBox="-2 -3 24 24" height={'50%'} width={'50%'} /></MessagesButton>
                    <Button variant={props.isFollow ? 'primary' : 'outlined'}
                        onClick={followOnClickHandler}
                        disabled={props.appRequestStatus === "loading"}
                    >{props.isFollow ? 'Unfollow' : 'Follow'}</Button>
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
    color: ${theme.color.text.placeholder};
`
const BackgroundImage = styled.img`
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
`
const AvatarImage = styled.img`
    position: absolute;
    top: 45%;
    left: 5%;
    width: 17%;
    border-radius: 50%;
    border: 1px solid ${theme.color.text.placeholder};
`
const DefaultAvatar = styled(Icon)`
    position: absolute;
    top: 45%;
    left: 5%;
    width: 17%;
    height: auto;
    border-radius: 50% 50%;
    border: 1px solid ${theme.color.text.placeholder};
`

const InfoConainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30%;
    padding: 0 5%;
`
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: ${theme.color.text.primary};
`

const Name = styled.span`
    ${font({ weight: 700, Fmin: 16, Fmax: 30 })}
`

const About = styled.span`
    ${font({ weight: 100, Fmin: 10, Fmax: 22 })}
`

const ButtonsContainer = styled.div`
    display: flex;
    height: 40%;
    min-height: 30px;
    gap: 10px;
    justify-content: end;
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
   
    &:active {
            background-color: ${theme.color.background.primary};
            color: ${theme.color.text.primary};
            border-color: ${theme.color.background.second};
        }
`