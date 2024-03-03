import styled from "styled-components"
import { theme } from "../../../../styles/Theme.styled"
import { font } from "../../../../styles/Font"
import { NavLink } from "react-router-dom"
import { UserResponseType } from "../../../../api/social-network-api"
import { Icon } from "../../../micro/icon/Icon"

type FriendPropsType = {
    friendData: UserResponseType
}

export const Friend: React.FC<FriendPropsType> = (props) => {
    return (
        <StyledFriend to={"/profile/" + props.friendData.id} >
            <AvaterContainer>
                {props.friendData.photos.small
                    ? <Avatar src={props.friendData.photos.small} />
                    : <DefaultAvatar iconId={'avatarDefault'} viewBox="0 0 1024 1024" height={'100%'} width={'100%'} />}
            </AvaterContainer>
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

const AvaterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    min-width: 40px;
    max-width: 50px;
    color: ${theme.color.text.placeholder};
`

const Avatar = styled.img`
   border-radius: 50% 50%;
   object-fit: fill;
   aspect-ratio: 1/1;
   width: 100%;
   background-color: ${theme.color.background.primary};
   border: 1px solid ${theme.color.text.placeholder};
 
`
const DefaultAvatar = styled(Icon)`
    border-radius: 50% 50%;
   object-fit: fill;
   aspect-ratio: 1/1;
   width: 100%;
   background-color: ${theme.color.background.primary};
   border: 1px solid ${theme.color.text.placeholder};
`

const Name = styled.span`
    width: 50%;
    text-align: center;
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    color: ${theme.color.text.primary_dark};
    word-wrap: break-word;
    overflow: hidden;
`