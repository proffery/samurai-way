import React, { memo } from "react"
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'
import { ToTop } from 'components/common/toTop/ToTop'
import { FriendsBlockContainer } from 'components/containers/FriendsBlockContainer'
import { MessagesBlock } from 'components/blocks/messagesBlock/MessagesBlock'
import { AlertType } from 'store/app/appReducer'
import { DialogResponseType, MessageRasponseType } from 'api/social-network-api'

type MessagesPropsType = {
    messages: MessageRasponseType[]
    dialogs: DialogResponseType[]
    addMessage: (message: string) => void
    addAppAlert: (type: AlertType, message: string) => void
}

export const Messages: React.FC<MessagesPropsType> = memo((props) => {
    const { messages, dialogs, addMessage, addAppAlert } = props
    return (
        <StyledMessages id="messages">
            <ToTop anchor_id='messages-block' />
            <StyledFriends />
            <MessagesBlock
                messages={messages}
                addAppAlert={addAppAlert}
                addMessage={addMessage}
            />
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