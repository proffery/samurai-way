import React, { memo } from "react"
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'
import { ToTop } from 'components/common/toTop/ToTop'
import { FriendsBlockContainer } from 'components/containers/FriendsBlockContainer'
import { MessagesBlock } from 'components/blocks/messagesBlock/MessagesBlock'
import { AlertType } from 'store/app/appReducer'
import { DialogResponseType, MessageResponseType } from 'api/social-network-api'
import { AuthStateType } from 'store/auth/authReducer'

type MessagesPropsType = {
    className?: string
    userId: number
    authData: AuthStateType
    dialogs: DialogResponseType[]
    messages: MessageResponseType[]
    addMessage: (message: string) => void
    addAppAlert: (type: AlertType, message: string) => void
}

export const Messages: React.FC<MessagesPropsType> = memo((props) => {
    const { messages, dialogs, authData, addMessage, addAppAlert } = props

    return (
        <StyledMessages id="messages">
            <ToTop anchor_id='messages-block' />
            <StyledFriends />
            <MessagesBlock
                dialogData={dialogs[0]}
                messages={messages}
                authData={authData}
                addMessage={addMessage}
                addAppAlert={addAppAlert}
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