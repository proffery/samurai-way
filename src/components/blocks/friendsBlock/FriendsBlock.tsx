import React from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { Friend } from "./friend/Friend"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { FriendStateType } from "../../../redux/profileReducer"
import { DialogStateType } from "../../../redux/messagesReducer"


type FriendsBlockPropsType = {
    className?: string
    friendsData: FriendStateType[] 
}

export const FriendsBlock: React.FC<FriendsBlockPropsType> = (props) => {
    return (
        <BlockSection id="friends" className={props.className}>
            <BlockHeader>Friends</BlockHeader>
            <FriendsList friendsData={props.friendsData}/>
        </BlockSection>
    )
}

type FriendsListPropsType = {
    friendsData: FriendStateType[] | DialogStateType[]
}

const FriendsList: React.FC<FriendsListPropsType> = (props) => {
    return (
        <StyledFriendsList>
            {props.friendsData.map(friend => <Friend key={friend.id} friendData={friend} />)}
        </StyledFriendsList>
    )
}

const StyledFriendsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media ${theme.media.mobile} {
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        overflow-y: scroll;
    }
`