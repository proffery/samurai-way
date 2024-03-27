import { Patch } from 'components/app/Router/routeNames'
import { MessagesForm } from 'components/blocks/messagesBlock/messagesForm/MessagesForm'
import { MessagesList } from 'components/blocks/messagesBlock/messagesList/MessagesList'
import { Avatar } from 'components/common/avatar/Avatar'
import { memo } from 'react'
import { AuthState } from 'store/auth/authReducer'
import { MessagesState } from 'store/messages/messagesReducer'
import { S } from './MessagesBlock_Styles'
import { AlertType } from 'store/app/appReducer'

type Props = {
    className?: string
    messagesState: MessagesState
    appIsLoading: boolean
    authData: AuthState
    addMessage: (message: string) => void
    pageChangeHandler: () => void
    addAppAlert: (type: AlertType, message: string) => void
}

export const MessagesBlock: React.FC<Props> = memo((props) => {
    const { addMessage, addAppAlert, pageChangeHandler,
        authData, appIsLoading, messagesState } = props

    return <S.MessagesBlock id="messages-block">
        <S.Header >
            <S.ProfileLink to={Patch.Profile + messagesState.dialogs[0]?.id}>
                <Avatar avatarURL={messagesState.dialogs[0]?.photos.small} />
                {messagesState.dialogs[0]?.userName}:
            </S.ProfileLink>
        </S.Header>
        <S.ListWrapper>
            <MessagesList
                authData={authData}
                appIsLoading={appIsLoading}
                messagesState={messagesState}
                pageChangeHandler={pageChangeHandler}
            />
            <MessagesForm
                addAppAlert={addAppAlert}
                addMessage={addMessage}
            />
        </S.ListWrapper>
    </S.MessagesBlock >
})




