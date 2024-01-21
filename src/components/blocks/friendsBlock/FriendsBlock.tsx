import React from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { Friend } from "./friend/Friend"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { FriendStateType } from "../../../redux/friendsReducer"
import { v1 } from "uuid"


type FriendsBlockPropsType = {
    className?: string
    friendsData: FriendStateType[]
    setFriends: (friends: FriendStateType[]) => void
}

export const FriendsBlock: React.FC<FriendsBlockPropsType> = (props) => {

    if (props.friendsData.length === 0) {
        props.setFriends([
            {
                id: v1(),
                name: 'Dimych',
                second_name: 'Incubator',
                photoUrl: 'https://ict2go.ru/uploads/media/speakers_lid_image/0001/29/thumb_28624_speakers_lid_image_big.jpeg',
            },
            {
                id: v1(),
                name: 'Sveta',
                second_name: 'Incubator',
                photoUrl: 'https://i.ytimg.com/vi/QxlejW_wtJY/maxresdefault.jpg',
            },
            {
                id: v1(),
                name: 'Viktor',
                second_name: 'Incubator',
                photoUrl: 'https://i.ytimg.com/vi/esQARNPC3vY/sddefault.jpg'
            }
        ])
    }


    const friendsList = () => {
        return (
            <>
                <StyledFriendsList>
                    {props.friendsData.map(friend => <Friend key={friend.id} friendData={friend} />)}
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
min-width: 10vw;
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
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }
`