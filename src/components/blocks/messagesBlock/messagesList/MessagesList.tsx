import { Message } from "components/blocks/messagesBlock/message/Message"
import { AuthState } from "store/auth/authReducer"
import { MessagesState } from "store/messages/messagesReducer"
import { S } from "./MessagesList_Styles"
import { DeletedMessage } from "components/blocks/messagesBlock/message/DeletedMessage"

type Props = {
  messagesState: MessagesState
  appIsLoading: boolean
  authData: AuthState
  pageChangeHandler: () => void
  markMessageAsDelete: (messageId: string) => void
  markMessageAsSpam: (messageId: string) => void
  restoreMessage: (messageId: string) => void
}

export const MessagesList: React.FC<Props> = (props) => {
  const { authData, appIsLoading, pageChangeHandler, markMessageAsDelete, markMessageAsSpam, restoreMessage } = props
  const { messagesOnPage, totalMessagesCount, messages, dialogs } = props.messagesState
  return (
    <S.MessagesList>
      {messagesOnPage < totalMessagesCount && (
        <S.LoadMessgesButton
          variant={"outlined"}
          ariaLabel={"Load more messages"}
          disabled={appIsLoading}
          onClick={pageChangeHandler}
        >
          load more messages...
        </S.LoadMessgesButton>
      )}
      {messages.length ? (
        messages.map((message) =>
          !message.isDleted && !message.isSpam ? (
            <Message
              key={message.id}
              authId={authData.id}
              messageData={message}
              authPhoto={authData.photoUrl}
              opponentPhoto={dialogs[0]?.photos.small}
              markMessageAsDelete={markMessageAsDelete}
              markMessageAsSpam={markMessageAsSpam}
            />
          ) : (
            <DeletedMessage
              key={message.id}
              authId={authData.id}
              messageData={message}
              authPhoto={authData.photoUrl}
              opponentPhoto={dialogs[0]?.photos.small}
              restoreMessage={restoreMessage}
            />
          ),
        )
      ) : (
        <S.EmptyMessages>No messages...</S.EmptyMessages>
      )}
    </S.MessagesList>
  )
}
