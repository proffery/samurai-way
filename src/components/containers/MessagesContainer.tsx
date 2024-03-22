import { Messages } from 'components/layout/pages/messages/Messages'
import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { selectAuthData } from 'store/auth/authSelectors'
import { selectDialogs, selectMessages } from 'store/messages/messagesSelectors'
import { useActions } from 'utils/customHooks/useActions'

export const MessagesContainer: React.FC = memo(() => {
    const messages = useSelector(selectMessages)
    const dialogs = useSelector(selectDialogs)
    const authData = useSelector(selectAuthData)
    const { addAppAlert, startDialog, getDialogs, sendMessage } = useActions()
    const params = useParams<{ userId: string }>()
    const history = useHistory()

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
        }


    }, [params.userId])

    const addMessage = (message: string) => {
        params.userId && sendMessage({ userId: +params.userId, message })
    }
    return <Messages
        userId={+params.userId}
        dialogs={dialogs}
        messages={messages}
        authData={authData}
        addAppAlert={addAppAlert}
        addMessage={addMessage}
    />
})
