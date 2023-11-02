import styled from "styled-components"
import { FriendsBlock } from "../../../blocks/friendsBlock/FriendsBlock"
import { MessagesBlock } from "../../../blocks/messagesBlock/MessagesBlock"
import { ToTopLink } from "../../../micro/toTopLink/ToTopLink"
import { theme } from "../../../../styles/Theme.styled"
import { MessagesPageStateType } from "../../../../redux/state"

type MessagesPropsType = {
    messagesData: MessagesPageStateType
}

export const Messages: React.FC<MessagesPropsType> = (props) => {
    return (
        <StyledMessages id="messages">
            <MessagesFriendsBlock block_header="Dialogs" friendsData={props.messagesData.dialogs}/>
            <StyledMessagesBlock messagesData={props.messagesData.messages}/>
            <ToTopLink top_block_anchor_id="messages"/>
        </StyledMessages>
    )
}

const StyledMessages = styled.main`
    display: flex;
    @media ${theme.media.mobile} {
        flex-direction: column;
    }
`

const MessagesFriendsBlock = styled(FriendsBlock)`
    width: 30%;
    @media ${theme.media.mobile} {
        width: 100%;
        max-height: 30%;
    }
`

const StyledMessagesBlock = styled(MessagesBlock)`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`