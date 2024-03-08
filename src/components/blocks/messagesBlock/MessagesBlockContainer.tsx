import { connect } from "react-redux"
import { addMessage, onChangeMessage } from "../../../redux/messages/messagesReducer"
import { MessagesBlock } from "./MessagesBlock"
import { AppRootStateType } from "../../../redux/redux-store"
import { compose } from "redux"
import { selectMessages } from 'redux/messages/messagesSelectors'

const mapStateToProps = (state: AppRootStateType) => {
    return {
        messages: selectMessages(state),
        newMessageForm: state.messages.newMessageForm //Need fix
    }
}

export const MessagesBlockContainer = compose(
    connect(mapStateToProps, { onChangeMessage, addMessage })
)(MessagesBlock) 