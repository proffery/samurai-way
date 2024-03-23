import React, { memo } from "react"
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'
import { ToTop } from 'components/common/toTop/ToTop'
import { FriendsBlockContainer } from 'components/containers/FriendsBlockContainer'
import { MessagesBlock } from 'components/blocks/messagesBlock/MessagesBlock'
import { AlertType } from 'store/app/appReducer'
import { AuthStateType } from 'store/auth/authReducer'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { DialogsBlock } from 'components/blocks/dialogsBlock/DialogsBlock'
import { DialogResponseType, MessageResponseType } from 'api/dialogsAPI'
import { PossibleFriendsBlockContainer } from 'components/containers/PossibleFriendsBlockContainer'

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
    const {className, messages, dialogs, authData, addMessage, addAppAlert } = props

    return (
        <StyledMessages id="messages" className={className}>
            <ToTop anchor_id='dialogs-block' />
            <StyledFriendsWrapper direction={'column'} gap={'min(30px, 2vw)'}>
                <FriendsBlockContainer />
                <PossibleFriendsBlockContainer />
            </StyledFriendsWrapper>
            <MessagesWrapper direction={'column'}>
                <DialogsBlock dialogs={dialogs} />
                <StyledMessagesBlock
                    dialogData={dialogs[0]}
                    messages={messages}
                    authData={authData}
                    addMessage={addMessage}
                    addAppAlert={addAppAlert}
                />
            </MessagesWrapper>
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
const StyledMessagesBlock = styled(MessagesBlock)`
    min-height: 100%;
`
const StyledFriendsWrapper = styled(FlexWrapper)`
    width: 20%;
    @media ${theme.media.mobile} {
        display: none;
    }
`
const MessagesWrapper = styled(FlexWrapper)`
    width: 80%;
    gap: min(30px, 2vw);
    @media ${theme.media.mobile} {
        width: 100%;
    }
`