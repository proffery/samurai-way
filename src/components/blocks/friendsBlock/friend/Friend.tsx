import styled from "styled-components"
import { theme } from "../../../../styles/Theme.styled"
import { font } from "../../../../styles/Font"
import { NavLink } from "react-router-dom"
import { UserResponseType } from "../../../../api/social-network-api"
import { Icon } from "../../../micro/icon/Icon"

type FriendPropsType = {
    friend: UserResponseType
}

export const Friend: React.FC<FriendPropsType> = (props) => {
    return (
        <StyledFriend to={"/profile/" + props.friend.id} >
            <AvaterContainer>
                {props.friend.photos.small
                    ? <Avatar src={props.friend.photos.small} />
                    : <DefaultAvatar iconId={'avatarDefault'} viewBox="0 0 1024 1024" height={'100%'} width={'100%'} />}
            </AvaterContainer>
            <Name>{props.friend.name}</Name>

        </StyledFriend>
    )
}

const StyledFriend = styled(NavLink)`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    min-width: 100px;
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
        width: 40%;
        max-width: 40px;
    }
`

const AvaterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    color: ${theme.color.text.placeholder};
`

const Avatar = styled.img`
   border-radius: 50% 50%;
   object-fit: fill;
   aspect-ratio: 1/1;
   width: 50%;
   max-width: 54px;
   background-color: ${theme.color.background.primary};
   border: 1px solid ${theme.color.text.placeholder};
   @media ${theme.media.mobile} {
        width: 40%;
        max-width: 40px;
    }
`
const DefaultAvatar = styled(Icon)`
    border-radius: 50% 50%;
   object-fit: fill;
   aspect-ratio: 1/1;
   width: 50%;
   max-width: 54px;
   background-color: ${theme.color.background.primary};
   border: 1px solid ${theme.color.text.placeholder};
   @media ${theme.media.mobile} {
        width: 40%;
        max-width: 40px;
    }
`

const Name = styled.span`
    width: 60%;
    text-align: center;
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    color: ${theme.color.text.primary_dark};
    word-wrap: break-word;
    overflow: hidden;
`