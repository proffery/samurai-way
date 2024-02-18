import styled from "styled-components"
import { Button } from "../../../micro/button/Button"
import { theme } from "../../../../styles/Theme.styled"
import { font } from "../../../../styles/Font"
import { FlexWrapper } from "../../../micro/FlexWrapper.styled"
import { UserStateType } from "../../../../redux/usersReducer"
import { NavLink } from "react-router-dom"
import { Icon } from "../../../micro/icon/Icon"
import { MouseEvent } from "react"

type UserPropsType = {
    user: UserStateType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = (props) => {
    const userOnClickFollowHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        return props.user.followed
            ? props.unfollow(props.user.id)
            : props.follow(props.user.id)
    }
    return (
        <StyledUser to={"/profile/" + props.user.id}>
            <UserInfo >
                <AvatarContainer >
                    {props.user.photos.small
                        ? <UserAvatar src={props.user.photos.small} />
                        : <DefaultAvatar iconId={'avatarDefault'} viewBox="0 0 1024 1024" height={'100%'} width={'100%'} />}
                    <UserName>{props.user.name + ' '}</UserName>
                </AvatarContainer>
                <StatusContainer>
                    {props.user.status && <UserStatus>{props.user.status + ' '}</UserStatus>}
                    {/* <UserLocation>{props.user.location.city + ', ' + props.user.location.country + ' '}</UserLocation> */}
                </StatusContainer>
            </UserInfo>
            <ButtonContainer>
                <Button
                    variant={props.user.followed ? 'primary' : 'outlined'}
                    onClick={userOnClickFollowHandler}
                    disabled={props.user.requestStatus === 'loading'}
                >{props.user.followed ? 'UNFOLLOW' : 'FOLLOW'}</Button>
            </ButtonContainer>
        </StyledUser>
    )
}

const StyledUser = styled(NavLink)`
    display: flex;
    position: relative;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    ${font({ weight: 300, Fmin: 10, Fmax: 16 })}
    gap: 20px;
    padding: 20px 0;
    &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        background-color: ${theme.color.background.primary};
        bottom: 0;
    }
    &:hover {
        outline: 1px solid ${theme.color.background.primary};
        background-color: ${theme.color.background.primary};
        border-radius: 10px;
    }
`
const UserInfo = styled.div`
    width: 65%;
    display: flex;
    align-items: center;
    color: ${theme.color.text.primary_dark};
    gap: 15px;
`
const UserAvatar = styled.img`
   border-radius: 50% 50%;
   object-fit: cover;
   aspect-ratio: 1/1;
   width: 54px;
   background-color: ${theme.color.background.primary};
   border: 1px solid ${theme.color.text.placeholder};
   @media ${theme.media.mobile} {
        width: 40px;
    }
`
const DefaultAvatar = styled(Icon)`
    border-radius: 50% 50%;
   object-fit: cover;
   aspect-ratio: 1/1;
   width: 54px;
   background-color: ${theme.color.background.primary};
   border: 1px solid ${theme.color.text.placeholder};
   @media ${theme.media.mobile} {
        width: 40px;
    }
`
const UserName = styled.p`
    text-align: center;
    overflow-wrap: anywhere;
    ${font({ weight: 700, Fmin: 10, Fmax: 16 })}
    color: ${theme.color.text.primary_dark};
`
const UserStatus = styled.p`
    text-align: start;
    white-space: normal;
    ${font({ weight: 400, Fmin: 12, Fmax: 16 })}
    color: ${theme.color.text.primary_dark};
`
// const UserLocation = styled.span`
//     justify-self: flex-end;
//     white-space: nowrap;
//     ${font({weight: 300, Fmin: 10, Fmax: 12})}
// `
const StatusContainer = styled.div`
    width: 70%;
`
const ButtonContainer = styled(FlexWrapper)`
    width: 30%;
    align-items: center;
    justify-content: center;
`

const AvatarContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
    width: 25%;
    color: ${theme.color.text.placeholder};
    @media ${theme.media.mobile} {
        width: 100%;
    }
`