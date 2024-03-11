import { FriendsBlockContainer } from 'components/containers/FriendsBlockContainer'
import { MessagesBlockContainer } from 'components/containers/MessagesBlockContainer'
import React, { memo } from "react"
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'


type MessagesPropsType = {

}

export const Messages: React.FC<MessagesPropsType> = memo((props) => {
    return (
        <StyledMessages id="messages">
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