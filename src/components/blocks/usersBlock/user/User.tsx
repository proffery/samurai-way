import styled from "styled-components"
import { Button } from "../../../micro/button/Button"
import { theme } from "../../../../styles/Theme.styled"
import { font } from "../../../../styles/Font"
import { FlexWrapper } from "../../../micro/FlexWrapper"
import emtyAvatar from '../../../../assets/images/NoAvatar.jpeg'
import { UserStateType } from "../../../../redux/usersReducer"

type UserPropsType = {
    user: UserStateType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = (props) => {
    const userOnClickFollowHandler = () => {
        return props.user.followed
            ? props.unfollow(props.user.id)
            : props.follow(props.user.id)
    }
    return (
        <StyledUser>
            <UserInfo>
                <FlexWrapper direction="column" gap="5px">
                    <UserAvatar src={props.user.photos.small ? props.user.photos.small : emtyAvatar} />
                    <UserName>{props.user.name + ' '}</UserName>
                </FlexWrapper>
                <StatusContainer gap="5px" wrap="wrap" align="center" justify="space-between">
                    {props.user.status && <UserStatus>{props.user.status + ' '}</UserStatus>}
                    {/* <UserLocation>{props.user.location.city + ', ' + props.user.location.country + ' '}</UserLocation> */}
                </StatusContainer>
            </UserInfo>
            <ButtonContainer align="center">
                <Button
                    variant={props.user.followed ? 'primary' : 'outlined'}
                    onClick={userOnClickFollowHandler}
                    name={props.user.followed ? 'UNFOLLOW' : 'FOLLOW'}
                    disabled={props.user.requestStatus === 'loading'}
                />
            </ButtonContainer>
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
   object-fit: cover;
   aspect-ratio: 1/1;
   width: 60px;
   background-color: ${theme.color.background.primary};;
   border: 1px solid ${theme.color.text.placeholder};
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

// const UserLocation = styled.span`
//     justify-self: flex-end;
//     white-space: nowrap;
//     ${font({weight: 300, Fmin: 10, Fmax: 12})}
// `

const StatusContainer = styled(FlexWrapper)`
    width: 100%;
`

const ButtonContainer = styled(FlexWrapper)`
    width: 25%;
`

