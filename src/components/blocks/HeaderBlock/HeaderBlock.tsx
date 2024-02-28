import React from "react"
import styled from "styled-components"
import { Button } from "../../micro/button/Button"
import { Icon } from "../../micro/icon/Icon"
import { theme } from "../../../styles/Theme.styled"
import { font } from "../../../styles/Font"
import { NavLink } from "react-router-dom"
import { BlockSection } from "../../micro/BlockSection.styled"
import { ProfileStateType } from "../../../redux/profileReducer"
import { AuthStateType } from "../../../redux/authReducer"

type HeaderBlockPropsType = {
    className?: string
    authData: AuthStateType
    profileData: ProfileStateType
    appIsLoading: boolean
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const HeaderBlock: React.FC<HeaderBlockPropsType> = (props) => {
    const { isFollow, fullName, userId, status } = props.profileData.data
    const { small, large } = props.profileData.data.photos
    const { id: authId } = props.authData

    const followOnClickHandler = () => {
        isFollow ? props.unfollow(userId) : props.follow(userId)
    }
    return (
        <StyledHeaderBlock id="profile-header" className={props.className}>
            <BackgroundConainer>
                {large
                    ? <BackgroundImage src={large} />
                    : <Icon iconId={'avatarDefault'} viewBox="0 0 1024 1024" height={'100%'} width={'100%'} />}
                {small
                    ? <AvatarImage src={small} />
                    : <DefaultAvatar iconId={'avatarDefault'} viewBox="0 0 1024 1024" height={'100%'} width={'100%'} />}
            </BackgroundConainer>
            <InfoConainer>
                <TextContainer>
                    <Name>{fullName}</Name>
                    <Status>{status}</Status>
                </TextContainer>
                {authId !== userId ? <ButtonsContainer>
                    <MessagesButton
                        to={`/messages/${userId}`}
                    ><Icon iconId={'messages'} viewBox="-2 -3 24 24" height={'50%'} width={'50%'} /></MessagesButton>
                    <Button variant={isFollow ? 'primary' : 'outlined'}
                        onClick={followOnClickHandler}
                        disabled={props.appIsLoading}
                    >{isFollow ? 'Unfollow' : 'Follow'}</Button>
                </ButtonsContainer>
                    : <div></div>
                }
            </InfoConainer>
        </StyledHeaderBlock>
    )
}

const StyledHeaderBlock = styled(BlockSection)`
    aspect-ratio: 19 / 7;
    flex-direction: column;
    padding: 0;
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
    border-radius: 10px 10px 0 0;
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
    height: 90%;
`
const Name = styled.span`
    white-space: nowrap;
    ${font({ weight: 700, Fmin: 16, Fmax: 30 })}
`
const Status = styled.p`
    ${font({ weight: 100, Fmin: 10, Fmax: 22 })}
    height: 100%;
    overflow-y: auto;
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