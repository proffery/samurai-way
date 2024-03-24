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

type MessagesPropsType = {
    className?: string
    userId: number
    authData: AuthStateType
    appIsLoading: boolean
    messagesState: MessagesStateType
    addMessage: (message: string) => void
    onPageChangeHandler: (pageNumber: number) => void
    addAppAlert: (type: AlertType, message: string) => void
}

export const Messages: React.FC<MessagesPropsType> = memo((props) => {
    const {className, authData, appIsLoading, addMessage, addAppAlert, onPageChangeHandler } = props
    const {messages, dialogs, currentPage, totalMessagesCount, messagesOnPage} = props.messagesState

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
                    currentPage={currentPage}
                    usersOnPage={messagesOnPage}
                    totalUsersCount={totalMessagesCount}
                    onPageChangeHandler={onPageChangeHandler}
                    appIsLoading={appIsLoading}
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