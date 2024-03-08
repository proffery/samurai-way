import styled from "styled-components"
import { Button } from "../../../micro/button/Button"
import { theme } from "../../../../styles/Theme.styled"
import { font } from "../../../../styles/Font"
import { FlexWrapper } from "../../../micro/FlexWrapper.styled"
import { UserStateType } from "../../../../redux/users/usersReducer"
import { NavLink } from "react-router-dom"
import { MouseEvent } from "react"
import { Avatar } from '../../../micro/avatar/Avatar'

type UserPropsType = {
    user: UserStateType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = (props) => {
    const { id: userId, followed, status, isLoading, name, photos } = props.user
    const { follow, unfollow } = props

    const userOnClickFollowHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        return followed ? unfollow(userId) : follow(userId)
    }
    return (
        <StyledUser to={"/profile/" + userId}>
            <UserInfo >
                <StyledAvatar>
                    <Avatar avatarURL={photos.small} />
                    <UserName>{name + ' '}</UserName>
                </StyledAvatar>
                {status ? <UserStatus>{status + ' '}</UserStatus> : <UserStatus></UserStatus>}
            </UserInfo>
            <ButtonContainer>
                <Button
                    variant={followed ? 'primary' : 'outlined'}
                    onClick={userOnClickFollowHandler}
                    disabled={isLoading}
                >{followed ? 'UNFOLLOW' : 'FOLLOW'}</Button>
            </ButtonContainer>
        </StyledUser>
    )
}

const StyledUser = styled(NavLink)`
    display: flex;
    position: relative;
    width: 100%;
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
    justify-content: space-between;
    color: ${theme.color.text.primary_dark};
    gap: 15px;
`
const StyledAvatar = styled(FlexWrapper)`
    flex-direction: column;
   border-radius: 50% 50%;
   object-fit: cover;
   aspect-ratio: 1/1;
   width: 54px;
   justify-self: center;
`
const UserName = styled.p`
    text-align: center;
    overflow-wrap: anywhere;
    ${font({ weight: 600, Fmin: 10, Fmax: 16 })}
    color: ${theme.color.text.primary_dark};
`
const UserStatus = styled.p`
    text-align: start;
    white-space: normal;
    width: 80%;
    ${font({ weight: 400, Fmin: 12, Fmax: 16 })}
    color: ${theme.color.text.primary_dark};
`
const ButtonContainer = styled(FlexWrapper)`
    width: 30%;
    align-items: center;
    justify-content: center;
`