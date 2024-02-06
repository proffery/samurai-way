import React, { useEffect } from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { Friend } from "./friend/Friend"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { UserStateType } from "../../../redux/usersReducer"


type FriendsBlockPropsType = {
    className?: string
    friends: UserStateType[]
    getFriends: () => void
}

export const FriendsBlock: React.FC<FriendsBlockPropsType> = (props) => {

    useEffect(() => {
        props.getFriends()
    }, [])
    
    const friendsList = () => {
        return (
            <>
                <StyledFriendsList>
                    {props.friends.map(friend => <Friend key={friend.id} friend={friend} />)}
                </StyledFriendsList>
            </>
        )
    }

    return (
        <StyledFriends id="friends" className={props.className}>
            <BlockHeader>Friends</BlockHeader>
            {friendsList()}
        </StyledFriends>
    )
}
const StyledFriends = styled(BlockSection)`
min-width: 12vw;
    @media ${theme.media.mobile} {
        width: 100%;
        max-height: 30%;
    }
`

const StyledFriendsList = styled.div`
    display: flex;
    height: fit-content;
    max-height: 50vh;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;
    @media ${theme.media.mobile} {
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
    }
`