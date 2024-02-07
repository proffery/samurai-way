import React, { useEffect } from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { Friend } from "./friend/Friend"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { UserStateType } from "../../../api/social-network-api"


type FriendsBlockPropsType = {
    className?: string
    possibleFriends: UserStateType[]
    getPossibleFriends: () => void
}

export const PossibleFriendsBlock: React.FC<FriendsBlockPropsType> = (props) => {
    useEffect(() => {
        props.getPossibleFriends()
    }, [])

    const possibleFriendsList = () => {
        return (
            <>
                <StyledFriendsList>
                    {props.possibleFriends.map(friend => <Friend key={friend.id} friend={friend} />)}
                </StyledFriendsList>
            </>
        )
    }

    return (
        <StyledFriends
            id={'possibleFriends'}
            className={props.className}
        >
            <BlockHeader>
                {'Possible friends'}
            </BlockHeader>
            {possibleFriendsList()}
        </StyledFriends>
    )
}
const StyledFriends = styled(BlockSection)`
width: fit-content;
    @media ${theme.media.mobile} {
        width: 100%;
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