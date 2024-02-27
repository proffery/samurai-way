import { connect } from "react-redux"
import { addMessage, onChangeMessage } from "../../../redux/messagesReducer"
import { MessagesBlock } from "./MessagesBlock"
import { AppRootStateType } from "../../../redux/redux-store"

const mapStateToProps = (state: AppRootStateType) => {
    return {
        messagesData: state.messages
    }
}

export const MessagesBlockContainer = connect(mapStateToProps, { onChangeMessage, addMessage })(MessagesBlock) 