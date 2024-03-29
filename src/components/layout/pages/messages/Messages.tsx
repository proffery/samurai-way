import { Patch } from 'components/app/Router/routeNames'
import { DialogsBlock } from 'components/blocks/dialogsBlock/DialogsBlock'
import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import { MessagesBlock } from 'components/blocks/messagesBlock/MessagesBlock'
import { ToTop } from 'components/common/toTop/ToTop'
import React, { memo, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { selectAppIsLoading } from 'store/app/appSelectors'
import { selectAuthData } from 'store/auth/authSelectors'
import { selectMessagesState } from 'store/messages/messagesSelectors'
import { useActions } from 'utils/customHooks/useActions'
import { S } from './Messages_Styles'
type Props = { className?: string }

const Messages: React.FC<Props> = memo(({ className }) => {
    const messagesState = useSelector(selectMessagesState)
    const appIsLoading = useSelector(selectAppIsLoading)
    const authData = useSelector(selectAuthData)
    const { addAppAlert, startDialog, getDialogs,
        sendMessage, getMessages, markMessageAsDelete,
         markMessageAsSpam, restoreMessage } = useActions()
    const params = useParams<{ userId: string }>()
    const history = useHistory()
    const { currentPage, messagesOnPage, totalMessagesCount } = messagesState
    const DOWNLOAD_MESSAGES_PORTION = 3

    useEffect(() => {
        if (!params.userId) {
            getDialogs()
                .then(res => {
                    if (res.payload?.dialogs[0]) {
                        history.push(Patch.Messages + res.payload.dialogs[0].id)
                    } else addAppAlert('info', 'Dialogs is emty... Start chatting with someone.')
                }).catch(err => {
                    addAppAlert('failed', err)
                })
        }
        else {
            startDialog(+params.userId)
            getMessages({ userId: +params.userId, currentPage, messagesOnPage })
        }
    }, [params.userId, currentPage, messagesOnPage])

    const pageChangeHandler = () => {
        let newMessagesNumber = messagesOnPage
        if (messagesOnPage < totalMessagesCount) {
            newMessagesNumber += DOWNLOAD_MESSAGES_PORTION
            getMessages({ userId: +params.userId, currentPage: 1, messagesOnPage: newMessagesNumber })
        }
    }

    const addMessage = (message: string) => {
        params.userId && sendMessage({ userId: +params.userId, message })
    }

    return <S.Messages id="messages">
        <ToTop anchor_id='dialogs-block' />
        <S.FriendsWrapper>
            <FriendsBlock className={className} headerName='Friens' />
            <FriendsBlock className={className} headerName='Might know' isFriends={false} />
        </S.FriendsWrapper>
        <S.MessagesWrapper>
            <DialogsBlock dialogs={messagesState.dialogs} />
            <MessagesBlock
                authData={authData}
                appIsLoading={appIsLoading}
                messagesState={messagesState}
                addMessage={addMessage}
                addAppAlert={addAppAlert}
                markMessageAsDelete={markMessageAsDelete}
                markMessageAsSpam={markMessageAsSpam}
                pageChangeHandler={pageChangeHandler}
                restoreMessage={restoreMessage}
            />
        </S.MessagesWrapper>
    </S.Messages>
})

export default Messages

