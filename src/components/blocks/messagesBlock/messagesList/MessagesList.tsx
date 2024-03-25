import { Message } from 'components/blocks/messagesBlock/message/Message'
import { Button } from 'components/common/button/Button'
import { AuthStateType } from 'store/auth/authReducer'
import { MessagesStateType } from 'store/messages/messagesReducer'
import styled from 'styled-components'

type MessagesListPropsType = {
    className?: string
    messagesState: MessagesStateType
    appIsLoading: boolean
    authData: AuthStateType
    usersOnPageChangeHandler: () => void
}
export const MessagesList: React.FC<MessagesListPropsType> = (props) => {
    const { authData, appIsLoading, usersOnPageChangeHandler } = props
    const { messagesOnPage, totalMessagesCount, messages, dialogs } = props.messagesState
    return <StyledMessagesList>
        {messagesOnPage < totalMessagesCount &&
            <LoadMessgesButton
                variant={'outlined'}
                ariaLabel={'Load more messages'}
                disabled={appIsLoading}
                onClick={usersOnPageChangeHandler}
            >
                load more messages...
            </LoadMessgesButton>
        }
        {messages.length ?
            messages.map(message =>
                <Message
                    key={message.id}
                    authId={authData.id}
                    messageData={message}
                    authPhoto={authData.photoUrl}
                    opponentPhoto={dialogs[0]?.photos.small}
                />
            ) : <EmptyMessages>No messages...</EmptyMessages>
        }
    </StyledMessagesList>
}

const StyledMessagesList = styled.div`
    display: flex;
    min-height: fit-content;
    flex-direction: column;
    gap: min(15px, 1vw);
    overflow-y: auto;
`
const EmptyMessages = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    padding-bottom: min(15px, 1vw);
    overflow-y: hidden;
`
const LoadMessgesButton = styled(Button)`
    display: flex;
    min-width: 100%;
    justify-content: center;
`