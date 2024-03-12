import React, { memo } from "react"
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'
import { ToTop } from 'components/common/toTop/ToTop'
import { FriendsBlockContainer } from 'components/containers/FriendsBlockContainer'
import { MessagesBlockContainer } from 'components/containers/MessagesBlockContainer'


type MessagesPropsType = {

}

export const Messages: React.FC<MessagesPropsType> = memo((props) => {
    return (
        <StyledMessages id="messages">
            <ToTop anchor_id='messages-block' />
            <StyledFriends />
            <MessagesBlockContainer />
        </StyledMessages>
    )
})

const StyledMessages = styled.main`
    display: flex;
    overflow-x: hidden;
    @media ${theme.media.mobile} {
        flex-direction: column;
    }
`
const StyledFriends = styled(FriendsBlockContainer)`
    width: 20%;
    @media ${theme.media.mobile} {
        width: 100%;
    }
`