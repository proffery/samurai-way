import React from "react"
import { UsersBlockContainer } from "../../../blocks/usersBlock/UsersBlockContainer"
import { FriendsBlockContainer } from "../../../blocks/friendsBlock/FriendsBlockContainer"
import styled from "styled-components"
import { FlexWrapper } from "../../../micro/FlexWrapper.styled"
import { PossibleFriendsBlockContainer } from "../../../blocks/friendsBlock/PossibleFriendsBlockContainer"
import { ToTop } from "../../../micro/toTop/ToTop"
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
            <ToTop top_block_anchor_id="all-users"/>
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
   width: 20%;
   @media ${theme.media.mobile} {
        width: 100%;
    }
`