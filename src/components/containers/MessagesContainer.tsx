import { compose } from 'redux'
import { connect } from 'react-redux'
import { AppRootStateType } from 'store/redux-store'
import { selectDialogs, selectMessages } from 'store/messages/messagesSelectors'
import { memo } from 'react'
import { Messages } from 'components/layout/pages/messages/Messages'


const MessagesAPI:React.FC<MessagesAPIPropsType> = memo(()=>{
    return <Messages />
})

const mapStateToProps = (state: AppRootStateType) => {
    return {
        messages: selectMessages(state),
        dialogs: selectDialogs(state)
    }
}

export const MessagesBlockContainer = compose(
    connect(mapStateToProps, {  })
)(MessagesAPI) 

type MessagesAPIPropsType = {

}