import React from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { MessageStateType } from "../../../redux/state"
import { Message } from "./message/Message"

type MessagesBlockPropsType = {
    className?: string
    messagesData: MessageStateType[]
}

export const MessagesBlock: React.FC<MessagesBlockPropsType> = (props) => {
    return (
        <BlockSection id="messages" className={props.className}>
            <BlockHeader>Messages</BlockHeader>
            <MessagesList messagesData={props.messagesData}/>
        </BlockSection>
    )
}

type MessagesListPropsType = {
    messagesData: MessageStateType[]
}

const MessagesList: React.FC<MessagesListPropsType> = (props) => {
    return (
        <>
            {props.messagesData.map(message => <Message key={message.id} messageData={message} />)}
        </>
    )
}