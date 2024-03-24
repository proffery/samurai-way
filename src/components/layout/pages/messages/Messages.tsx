import { DialogsBlock } from 'components/blocks/dialogsBlock/DialogsBlock'
import { MessagesBlock } from 'components/blocks/messagesBlock/MessagesBlock'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { ToTop } from 'components/common/toTop/ToTop'
import { FriendsBlockContainer } from 'components/containers/FriendsBlockContainer'
import { PossibleFriendsBlockContainer } from 'components/containers/PossibleFriendsBlockContainer'
import React, { memo } from "react"
import { AlertType } from 'store/app/appReducer'
import { AuthStateType } from 'store/auth/authReducer'
import { MessagesStateType } from 'store/messages/messagesReducer'
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'

type Props = {
    className?: string
    userId: number
    authData: AuthStateType
    appIsLoading: boolean
    messagesState: MessagesStateType
    addMessage: (message: string) => void
    usersOnPageChangeHandler: () => void
    addAppAlert: (type: AlertType, message: string) => void
}

export const Messages: React.FC<Props> = memo((props) => {
    const { authData, appIsLoading, addMessage, addAppAlert, usersOnPageChangeHandler } = props
    const { messages, dialogs, totalMessagesCount, messagesOnPage } = props.messagesState

    return (
        <StyledMessages id="messages">
            <ToTop anchor_id='dialogs-block' />
            <StyledFriendsWrapper direction={'column'} gap={'min(30px, 2vw)'}>
                <FriendsBlockContainer />
                <PossibleFriendsBlockContainer />
            </StyledFriendsWrapper>
            <MessagesWrapper direction={'column'}>
                <DialogsBlock dialogs={dialogs} />
                <MessagesBlock
                    messages={messages}
                    authData={authData}
                    dialogData={dialogs[0]}
                    appIsLoading={appIsLoading}
                    messagesOnPage={messagesOnPage}
                    totalMessagesCount={totalMessagesCount}
                    addMessage={addMessage}
                    addAppAlert={addAppAlert}
                    usersOnPageChangeHandler={usersOnPageChangeHandler}
                />
            </MessagesWrapper>
        </StyledMessages>
    )
})

const StyledMessages = styled.main`
    height: 100%;
    gap: min(30px, 2vw);
    display: flex;
    overflow-x: hidden;
    @media ${theme.media.mobile} {
        flex-direction: column;
    }
`
const StyledFriendsWrapper = styled(FlexWrapper)`
    width: 20%;
    @media ${theme.media.mobile} {
        display: none;
    }
`
const MessagesWrapper = styled(FlexWrapper)`
    width: 77%;
    flex: 1;
    gap: min(30px, 2vw);
    @media ${theme.media.mobile} {
        width: 100%;
    }
`