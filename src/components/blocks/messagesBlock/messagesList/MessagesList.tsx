import { DialogResponseType, MessageResponseType } from 'api/dialogsAPI'
import { Message } from 'components/blocks/messagesBlock/message/Message'
import { AuthStateType } from 'store/auth/authReducer'
import styled from 'styled-components'

type MessagesListPropsType = {
    className?: string
    messages: MessageResponseType[]
    dialogData?: DialogResponseType
    authData: AuthStateType
}
export const MessagesList: React.FC<MessagesListPropsType> = (props) => {
    const { dialogData, authData, messages } = props
    return (
        <StyledMessagesList>
            {messages.length ?
                messages.map(message =>
                    <Message
                        key={message.id}
                        authId={authData.id}
                        messageData={message}
                        authPhoto={authData.photoUrl}
                        opponentPhoto={dialogData?.photos.small}
                    />
                ) : <EmptyMessages>No messages...</EmptyMessages>
            }
        </StyledMessagesList>
    )
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
    padding-bottom: min(15px, 1vw);;
    overflow-y: hidden;
`