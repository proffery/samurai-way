import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { ToTop } from 'components/common/toTop/ToTop'
import { UsersBlockContainer } from 'components/containers/UsersBlockContainer'
import React, { memo } from "react"
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'

export const Users: React.FC = memo(() => {
    return (
        <StyledUsers id="users">
            <ToTop anchor_id='users-block' />
            <UsersBlockContainer />
            <OtherBlocks>
                <FriendsBlock blockHeaderName='Friends' />
                <FriendsBlock blockHeaderName='Might know' isFriends={false} />
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