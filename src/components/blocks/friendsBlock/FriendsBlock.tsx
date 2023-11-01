import React from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"

type FriendsBlockPropsType = {
    className?: string
    block_header: string
}

export const FriendsBlock: React.FC<FriendsBlockPropsType> = (props) => {
    return (
        <BlockSection id="friends" className={props.className}>
            <BlockHeader>{props.block_header}</BlockHeader>
        </BlockSection>
    )
}
