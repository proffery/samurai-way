import styled from "styled-components"
import { FriendsBlock } from "../../../components/blocks/friendsBlock/FriendsBlock"
import { MessagesBlock } from "../../../components/blocks/messagesBlock/MessagesBlock"
import { ToTopLink } from "../../../components/toTopLink/ToTopLink"

export const Messages = () => {
    return (
        <StyledMessages id="messages">
            <MessagesFriendsBlock block_header="Dialogs"/>
            <StyledMessagesBlock />
            <ToTopLink top_block_anchor_id="messages"/>
        </StyledMessages>
    )
}

const StyledMessages = styled.main`
    display: flex;
`

const MessagesFriendsBlock = styled(FriendsBlock)`
    
`

const StyledMessagesBlock = styled(MessagesBlock)`
    width: 100%;
`