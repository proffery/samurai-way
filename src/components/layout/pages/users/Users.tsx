import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { ToTop } from 'components/common/toTop/ToTop'
import { FriendsBlockContainer } from 'components/containers/FriendsBlockContainer'
import { PossibleFriendsBlockContainer } from 'components/containers/PossibleFriendsBlockContainer'
import { UsersBlockContainer } from 'components/containers/UsersBlockContainer'
import React, { memo } from "react"
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'


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