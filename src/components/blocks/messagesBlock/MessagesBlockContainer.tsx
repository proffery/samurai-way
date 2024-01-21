import { connect } from "react-redux"
import {
    MessagesReducerActionsType,
    addMessageAC, messageOnChangeAC
} from "../../../redux/messagesReducer"
import { MessagesBlock } from "./MessagesBlock"
import { AppRootStateType } from "../../../redux/redux-store"

const mapStateToProps = (state: AppRootStateType) => {
    return {
        messagesData: state.messages
    }
}

const mapDispatchToProps = (dispatch: (action: MessagesReducerActionsType) => void) => {
    return {
        onChangeMessage: (text: string) => {
            dispatch(messageOnChangeAC(text))
        },
        addMessage: () => {
            dispatch(addMessageAC())
            dispatch(messageOnChangeAC(''))
        }
    }
}

export const MessagesBlockContainer = connect(mapStateToProps, mapDispatchToProps)(MessagesBlock) 