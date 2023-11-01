import React from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"

type MessagesBlockPropsType = {
    className?: string
}

export const MessagesBlock: React.FC<MessagesBlockPropsType> = (props) => {
    return (
        <BlockSection id="messages" className={props.className}>
            <BlockHeader>Messages</BlockHeader>
        </BlockSection>
    )
}