import React from "react"
import { UsersBlockContainer } from "../../../blocks/usersBlock/UsersBlockContainer"
import { FriendsBlockContainer } from "../../../blocks/friendsBlock/FriendsBlockContainer"
import styled from "styled-components"
import { FlexWrapper } from "../../../micro/FlexWrapper.styled"
import { PossibleFriendsBlockContainer } from "../../../blocks/friendsBlock/PossibleFriendsBlockContainer"
import { ToTopLink } from "../../../micro/toTopLink/ToTopLink"
import { theme } from "../../../../styles/Theme.styled"

type UsersPropsType = {

}

export const Users: React.FC<UsersPropsType> = (props) => {
    return (
        <StyledUsers id="users">
            <UsersBlockContainer />
            <OtherBlocks>
                <FriendsBlockContainer />
                <PossibleFriendsBlockContainer />
            </OtherBlocks>
            <ToTopLink top_block_anchor_id="all-users"/>
        </StyledUsers>
    )
}

const StyledUsers = styled.main`
    display: flex;
    justify-content: space-between;
    @media ${theme.media.mobile} {
        flex-wrap: wrap;
    }
`
const OtherBlocks = styled(FlexWrapper)`
   flex-direction : column;
   gap: min(30px, 2vw);
   width: 24%;
   @media ${theme.media.mobile} {
        width: 100%;
    }
`