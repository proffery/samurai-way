import React from "react"
import { MessagesPageStateType, MessagesReducerActionsType, addMessageAC, messageOnChangeAC } from "../../../redux/messagesReducer"
import { MessagesBlock } from "./MessagesBlock"

type MessagesBlockContainerPropsType = {
    messagesData: MessagesPageStateType
    dispatch: (action: MessagesReducerActionsType) => void
}

export const MessagesBlockContainer: React.FC<MessagesBlockContainerPropsType> = (props) => {

    const onChangeMessage = (text: string) => {
        props.dispatch(messageOnChangeAC(text))
    }

    const addMessage = () => {
        props.dispatch(addMessageAC())
        props.dispatch(messageOnChangeAC(''))
    }

    return (
        <MessagesBlock
            messagesData={props.messagesData}
            onChangeMessage={onChangeMessage}
            addMessage={addMessage}
        />
    )
}