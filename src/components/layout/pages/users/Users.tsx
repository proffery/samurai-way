import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import { UsersBlock } from 'components/blocks/usersBlock/UsersBlock'
import { ToTop } from 'components/common/toTop/ToTop'
import React, { memo } from "react"
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'

const Users: React.FC = memo(() => {
    return <StyledUsers id="users">
        <ToTop anchor_id='users-block' />
        <UsersBlock />
        <Wrapper>
            <FriendsBlock blockHeaderName='Friends' />
            <FriendsBlock blockHeaderName='Might know' isFriends={false} />
        </Wrapper>
    </StyledUsers>
})

export default Users
const StyledUsers = styled.main`
    display: flex;
    justify-content: space-between;
    @media ${theme.media.mobile} {
        flex-wrap: wrap;
    }
`
const Wrapper = styled.div`
    display: flex;
    flex-direction : column;
    gap: min(30px, 2vw);
    width: 20%;
    @media ${theme.media.mobile} {
        display: none;
    }
`