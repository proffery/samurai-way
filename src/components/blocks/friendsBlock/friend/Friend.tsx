import styled from "styled-components"
import { DialogStateType, FriendStateType } from "../../../../redux/state"
import avatarImg from "../../../../assets/images/Author.webp"
import { theme } from "../../../../styles/Theme.styled"
import { font } from "../../../../styles/Font"
import { NavLink } from "react-router-dom"

type FriendPropsType = {
    friendData: FriendStateType | DialogStateType
}

export const Friend: React.FC<FriendPropsType> = (props) => {
    return (
        <StyledFriend >
            <NavLink to={"/profile/" + props.friendData.id}>
                <Avatar src={avatarImg} />
            </NavLink>
            <NavLink to={"/messages/" + props.friendData.id}>
                <Name>{props.friendData.name}</Name>
                <Name>{props.friendData.second_name}</Name>
            </NavLink>
        </StyledFriend>
    )
}

const StyledFriend = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
`

const Avatar = styled.img`
   border-radius: 50%;
   width: 50%;
   max-width: 40px;
   min-width: 30px;
`

const Name = styled.span`
    display: flex;
    width: 60%;
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    color: ${theme.color.text.primary_dark};
`