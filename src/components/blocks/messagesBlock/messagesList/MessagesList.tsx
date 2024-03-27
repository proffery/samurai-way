import { Message } from 'components/blocks/messagesBlock/message/Message'
import { AuthState } from 'store/auth/authReducer'
import { MessagesState } from 'store/messages/messagesReducer'
import { S } from './MessagesList_Styles'

type Props = {
    messagesState: MessagesState
    appIsLoading: boolean
    authData: AuthState
    pageChangeHandler: () => void
}

export const MessagesList: React.FC<Props> = (props) => {
    const { authData, appIsLoading, pageChangeHandler: usersOnPageChangeHandler } = props
    const { messagesOnPage, totalMessagesCount, messages, dialogs } = props.messagesState
    return <S.MessagesList>{messagesOnPage < totalMessagesCount &&
        <S.LoadMessgesButton
            variant={'outlined'}
            ariaLabel={'Load more messages'}
            disabled={appIsLoading}
            onClick={usersOnPageChangeHandler}
        >
            load more messages...
        </S.LoadMessgesButton>
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
            ) : <S.EmptyMessages>No messages...</S.EmptyMessages>
        }
    </S.MessagesList>
}