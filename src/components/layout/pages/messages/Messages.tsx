import React from "react"
import styled from "styled-components"
import { theme } from "../../../../styles/Theme.styled"
import { MessagesBlockContainer } from "../../../blocks/messagesBlock/MessagesBlockContainer"
import { FriendsBlockContainer } from "../../../blocks/friendsBlock/FriendsBlockContainer"

type MessagesPropsType = {

}

export const Messages: React.FC<MessagesPropsType> = (props) => {
    return (
        <StyledMessages id="messages">
            <StyledFriends />
            <MessagesBlockContainer />
        </StyledMessages>
    )
}

const StyledMessages = styled.main`
    display: flex;
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