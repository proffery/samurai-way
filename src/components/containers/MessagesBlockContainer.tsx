import { MessagesBlock } from 'components/blocks/messagesBlock/MessagesBlock'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { onChangeMessage, addMessage } from 'store/messages/messagesReducer'
import { selectMessages } from 'store/messages/messagesSelectors'
import { AppRootStateType } from 'store/redux-store'


const mapStateToProps = (state: AppRootStateType) => {
    return {
        messages: selectMessages(state),
        newMessageForm: state.messages.newMessageForm //Need fix
    }
}

export const MessagesBlockContainer = compose(
    connect(mapStateToProps, { onChangeMessage, addMessage })
)(MessagesBlock) 