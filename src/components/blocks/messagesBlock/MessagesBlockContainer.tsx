import { connect } from "react-redux"
import { addMessageTC, messageOnChangeAC } from "../../../redux/messagesReducer"
import { MessagesBlock } from "./MessagesBlock"
import { AppRootStateType } from "../../../redux/redux-store"

const mapStateToProps = (state: AppRootStateType) => {
    return {
        messagesData: state.messages
    }
}

export const MessagesBlockContainer = connect(mapStateToProps, {
    onChangeMessage: messageOnChangeAC,
    addMessage: addMessageTC
})(MessagesBlock) 