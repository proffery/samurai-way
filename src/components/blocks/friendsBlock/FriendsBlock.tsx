import React from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { Friend } from "./friend/Friend"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { UserResponseType } from "../../../api/social-network-api"
import { Button } from "../../micro/button/Button"
import { Icon } from "../../micro/icon/Icon"


type FriendsBlockPropsType = {
    className?: string
    friends: UserResponseType[]
    blockHeaderName: string
    refreshFriends: () => void
}

export const FriendsBlock: React.FC<FriendsBlockPropsType> = (props) => {

    const friendsList = () => {
        return (
            <StyledFriendsList>
                {props.friends.map(friend => <Friend key={friend.id} friend={friend} />)}
            </StyledFriendsList>
        )
    }

    return (
        <StyledFriends
            id={props.blockHeaderName.toLowerCase().replaceAll(' ', '-')}
            className={props.className}
        >
            <BlockHeader>
                {props.blockHeaderName}
            </BlockHeader>
            {friendsList()}
            <Button onClick={props.refreshFriends} variant={'link'} name={<Icon iconId={'refresh'}/>} className={props.className}/>
        </StyledFriends>
    )
}
const StyledFriends = styled(BlockSection)`
    width: 100%;
`

const StyledFriendsList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;
    @media ${theme.media.mobile} {
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
    }
`