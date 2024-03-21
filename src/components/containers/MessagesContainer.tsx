import { Messages } from 'components/layout/pages/messages/Messages'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectDialogs, selectMessages } from 'store/messages/messagesSelectors'
import { useActions } from 'utils/customHooks/useActions'

export const MessagesContainer: React.FC<MessagesBlockContainerType> = memo(() => {
    const messages = useSelector(selectMessages)
    const dialogs = useSelector(selectDialogs)

    const { addAppAlert } = useActions()
    const addMessage = (message: string) => {
        console.log(message);
        
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