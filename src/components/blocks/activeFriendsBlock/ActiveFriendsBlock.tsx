import React from "react"
import { BlockSection } from "../BlockSection.styled"
import { BlockHeader } from "../BlockHeader.styled"

type ActiveFriendsBlockPropsType = {
    className?: string
}

export const ActiveFriendsBlock: React.FC<ActiveFriendsBlockPropsType> = (props) => {
    return (
        <BlockSection id="active-friends" className={props.className}>
            <BlockHeader>Active</BlockHeader>
        </BlockSection>
    )
}
