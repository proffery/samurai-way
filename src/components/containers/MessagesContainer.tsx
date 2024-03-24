import { Messages } from 'components/layout/pages/messages/Messages'
import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { selectAppIsLoading } from 'store/app/appSelectors'
import { selectAuthData } from 'store/auth/authSelectors'
import { selectMessagesState } from 'store/messages/messagesSelectors'
import { useActions } from 'utils/customHooks/useActions'

export const MessagesContainer: React.FC = memo(() => {
    const messagesState = useSelector(selectMessagesState)
    const appIsLoading = useSelector(selectAppIsLoading)
    const authData = useSelector(selectAuthData)
    const { addAppAlert, startDialog, getDialogs, sendMessage, getMessages } = useActions()
    const params = useParams<{ userId: string }>()
    const history = useHistory()

    const { currentPage, messagesOnPage, totalMessagesCount } = messagesState
    const DOWNLOAD_MESSAGES_PORTION = 3
    useEffect(() => {
        if (!params.userId) {
            getDialogs()
                .then(res => {
                    if (res.payload?.dialogs[0]) {
                        history.push('/messages/' + res.payload.dialogs[0].id)
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

    const usersOnPageChangeHandler = () => {
        let newMessagesNumber = messagesOnPage
        if (messagesOnPage < totalMessagesCount){
            newMessagesNumber += DOWNLOAD_MESSAGES_PORTION
            getMessages({ userId: +params.userId, currentPage: 1, messagesOnPage: newMessagesNumber })
        }
    }

    const addMessage = (message: string) => {
        params.userId && sendMessage({ userId: +params.userId, message })
    }
    return <Messages
        authData={authData}
        userId={+params.userId}
        appIsLoading={appIsLoading}
        messagesState={messagesState}
        addMessage={addMessage}
        addAppAlert={addAppAlert}
        usersOnPageChangeHandler={usersOnPageChangeHandler}
    />
})
