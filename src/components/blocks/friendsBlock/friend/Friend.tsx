import styled from "styled-components"
import { theme } from "../../../../styles/Theme.styled"
import { font } from "../../../../styles/Font"
import { NavLink } from "react-router-dom"
import { UserResponseType } from "../../../../api/social-network-api"
import { Avatar } from '../../../micro/avatar/Avatar'

type FriendPropsType = {
    friendData: UserResponseType
}

export const Friend: React.FC<FriendPropsType> = (props) => {
    return (
        <StyledFriend to={"/profile/" + props.friendData.id} >
            <StyledAvatar avatarURL={props.friendData.photos.small} />
            <Name>{props.friendData.name}</Name>
        </StyledFriend>
    )
}

const StyledFriend = styled(NavLink)`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 6px;
    padding: 10px;
    &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        background-color: ${theme.color.background.primary};
        bottom: 0%;
    }
    &:hover {
        outline: 1px solid ${theme.color.background.primary};
        background-color: ${theme.color.background.primary};
        border-radius: 10px;
    }
    @media ${theme.media.mobile} {
        flex-direction: column;
        justify-content: flex-start;
        width: 30%;
    }
`
const StyledAvatar = styled(Avatar)`
    width: 45%;
`
const Name = styled.span`
    width: 53%;
    text-align: center;
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    color: ${theme.color.text.primary_dark};
    word-wrap: break-word;
    overflow: hidden;
`