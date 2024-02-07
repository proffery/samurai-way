import styled from "styled-components"
import { theme } from "../../../../styles/Theme.styled"
import { font } from "../../../../styles/Font"
import { NavLink } from "react-router-dom"
import emtyAvatar from '../../../../assets/images/NoAvatar.jpeg'
import { UserStateType } from "../../../../api/social-network-api"

type FriendPropsType = {
    friend: UserStateType
}

export const Friend: React.FC<FriendPropsType> = (props) => {
    return (
        <StyledFriend >
            <StyledNavLink to={"/profile/" + props.friend.id}>
                <Avatar src={props.friend.photos.small ? props.friend.photos.small : emtyAvatar} />
            </StyledNavLink>
            <NavLink to={"/messages/" + props.friend.id}>
                <Name>{props.friend.name}</Name>
            </NavLink>
        </StyledFriend>
    )
}

const StyledFriend = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding-bottom: 10px;
    &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        background-color: ${theme.color.background.primary};
        bottom: 0;
    }
`

const StyledNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
`

const Avatar = styled.img`
   border-radius: 50% 50%;
   object-fit: fill;
   aspect-ratio: 1/1;
   max-width: 80px;
   width: 100%;
   min-width: 60px;
   background-color: ${theme.color.background.primary};
   border: 1px solid ${theme.color.text.placeholder};
`

const Name = styled.span`
    width: 60%;
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    color: ${theme.color.text.primary_dark};
    word-wrap: break-word;
    overflow: hidden;
`