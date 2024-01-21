import styled from "styled-components"
import { UserStateType } from "../../../../redux/usersReducer"
import { Button } from "../../../micro/button/Button"
import { theme } from "../../../../styles/Theme.styled"
import { font } from "../../../../styles/Font"
import { FlexWrapper } from "../../../micro/FlexWrapper"

type UserPropsType = {
    user: UserStateType
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

export const User: React.FC<UserPropsType> = (props) => {
    const userOnClickFollowHandler = () => {
        return props.user.isFollowed
            ? props.unfollow(props.user.id)
            : props.follow(props.user.id)
    }
    return (
        <StyledUser>
            <UserInfo>
                <FlexWrapper direction="column" gap="5px">
                    <UserAvatar src={props.user.photoUrl} />
                    <UserName>{props.user.fullName + ' '}</UserName>
                </FlexWrapper>
                <StatusContainer gap="5px" wrap="wrap" align="center" justify="space-between">
                    <UserStatus>{props.user.status + ' '}</UserStatus>
                    <UserLocation>{props.user.location.city + ', ' + props.user.location.country + ' '}</UserLocation>
                </StatusContainer>
            </UserInfo>
            <FlexWrapper align="center">
                <Button
                    variant={props.user.isFollowed ? 'primary' : 'outlined'}
                    onClick={userOnClickFollowHandler}
                    name={props.user.isFollowed ? 'UNFOLLOW' : 'FOLLOW'}
                />
            </FlexWrapper>
        </StyledUser>
    )
}

const StyledUser = styled.div`
    display: flex;
    position: relative;
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
        top: 100%;
    }
`

const UserInfo = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    color: ${theme.color.text.primary_dark};
    gap: 15px;
`

const UserAvatar = styled.img`
   border-radius: 50% 50%;
   width: 100%;
   object-fit: cover;
   aspect-ratio: 1/1;
   max-width: 60px;
`

const UserName = styled.span`
    white-space: nowrap;
    ${font({ weight: 700, Fmin: 10, Fmax: 16 })}
    color: ${theme.color.text.primary_dark};
    text-align: center;
`

const UserStatus = styled.span`
    text-align: start;
    ${font({ weight: 400, Fmin: 12, Fmax: 16 })}
    color: ${theme.color.text.primary_dark};
`

const UserLocation = styled.span`
    justify-self: flex-end;
    width: 30%;
    ${font({weight: 300, Fmin: 10, Fmax: 12})}
`

const StatusContainer = styled(FlexWrapper)`
    width: 100%;
`