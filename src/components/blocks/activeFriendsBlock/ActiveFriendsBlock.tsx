import React from "react"
import { BlockSection } from "../BlockSection.styled"
import { BlockHeader } from "../BlockHeader.styled"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"

type ActiveFriendsBlockPropsType = {
    className?: string
}

export const ActiveFriendsBlock: React.FC<ActiveFriendsBlockPropsType> = (props) => {
    return (
        <ActiveFriends id="active-friends" className={props.className}>
            <BlockHeader>Active</BlockHeader>
        </ActiveFriends>
    )
}

const ActiveFriends = styled(BlockSection)`
    display: flex;
    min-height: 50%;
    align-self: flex-end;
    @media ${theme.media.mobile} {
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        overflow-y: scroll;
    }
`