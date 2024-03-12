import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'
import React, { RefObject, memo } from "react"
import { ToTop } from 'components/common/toTop/ToTop'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { FriendsBlockContainer } from 'components/containers/FriendsBlockContainer'
import { PossibleFriendsBlockContainer } from 'components/containers/PossibleFriendsBlockContainer'
import { UsersBlockContainer } from 'components/containers/UsersBlockContainer'

type UsersPropsType = {
    ref?: RefObject<HTMLDivElement>
}

export const Users: React.FC<UsersPropsType> = memo((props) => {
    return (
        <StyledUsers id="users">
            <ToTop anchor_id='users-block' />
            <UsersBlockContainer />
            <OtherBlocks>
                <FriendsBlockContainer />
                <PossibleFriendsBlockContainer />
            </OtherBlocks>
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