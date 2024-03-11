import { connect } from "react-redux"
import { addMessage, onChangeMessage } from "../../store/messages/messagesReducer"
import { MessagesBlock } from "../blocks/messagesBlock/MessagesBlock"
import { AppRootStateType } from "../../store/redux-store"
import { compose } from "redux"
import { selectMessages } from 'store/messages/messagesSelectors'

const mapStateToProps = (state: AppRootStateType) => {
    return {
        messages: selectMessages(state),
        newMessageForm: state.messages.newMessageForm //Need fix
    }
}

export const MessagesBlockContainer = compose(
    connect(mapStateToProps, { onChangeMessage, addMessage })
)(MessagesBlock) 