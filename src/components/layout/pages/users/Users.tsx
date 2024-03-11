import React, { memo } from "react"
import { UsersBlockContainer } from "../../../containers/UsersBlockContainer"
import { FriendsBlockContainer } from "../../../containers/FriendsBlockContainer"
import styled from "styled-components"
import { FlexWrapper } from "../../../common/FlexWrapper.styled"
import { PossibleFriendsBlockContainer } from "../../../containers/PossibleFriendsBlockContainer"
import { ToTop } from "../../../common/toTop/ToTop"
import { theme } from "../../../../styles/Theme.styled"

type UsersPropsType = {

}

export const Users: React.FC<UsersPropsType> = memo((props) => {
    return (
        <StyledUsers id="users">
            <UsersBlockContainer />
            <OtherBlocks>
                <FriendsBlockContainer />
                <PossibleFriendsBlockContainer />
            </OtherBlocks>
            <ToTop top_block_anchor_id="all-users" />
        </StyledUsers>
    )
})

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
        display: none;
    }
`