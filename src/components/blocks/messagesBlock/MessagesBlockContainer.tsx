import { connect } from "react-redux"
import { addMessage, onChangeMessage } from "../../../redux/messagesReducer"
import { MessagesBlock } from "./MessagesBlock"
import { AppRootStateType } from "../../../redux/redux-store"
import { compose } from "redux"

const mapStateToProps = (state: AppRootStateType) => {
    return {
        messagesData: state.messages
    }
}

export const MessagesBlockContainer = compose(
    connect(mapStateToProps, { onChangeMessage, addMessage })
)(MessagesBlock) 