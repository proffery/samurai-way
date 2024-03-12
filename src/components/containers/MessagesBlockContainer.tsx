import { compose } from 'redux'
import { connect } from 'react-redux'
import { AppRootStateType } from 'store/redux-store'
import { selectMessages } from 'store/messages/messagesSelectors'
import { onChangeMessage, addMessage } from 'store/messages/messagesReducer'
import { MessagesBlock } from 'components/blocks/messagesBlock/MessagesBlock'

const mapStateToProps = (state: AppRootStateType) => {
    return {
        messages: selectMessages(state),
        newMessageForm: state.messages.newMessageForm //Need fix
    }
}

export const MessagesBlockContainer = compose(
    connect(mapStateToProps, { onChangeMessage, addMessage })
)(MessagesBlock) 