import { Messages } from 'components/layout/pages/messages/Messages'
import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectDialogs, selectMessages } from 'store/messages/messagesSelectors'
import { useActions } from 'utils/customHooks/useActions'

export const MessagesContainer: React.FC<MessagesBlockContainerType> = memo(() => {
    const messages = useSelector(selectMessages)
    const dialogs = useSelector(selectDialogs)
    const { addAppAlert, startDialog, getDialogs, sendMessage } = useActions()
    const params = useParams<{userId: string}>()
    
    useEffect(()=> {
        params.userId ? startDialog(+params.userId) : getDialogs()
    }, [params.userId])

    const addMessage = (message: string) => {
        params.userId && sendMessage({userId: +params.userId, message})
    }
    return <Messages
        dialogs={dialogs}
        messages={messages}
        addAppAlert={addAppAlert}
        addMessage={addMessage}
    />
})

type MessagesBlockContainerType = {

}