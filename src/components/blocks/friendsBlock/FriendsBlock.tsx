import React from "react"
import { BlockHeader } from "../../micro/BlockHeader.styled"
import { BlockSection } from "../../micro/BlockSection.styled"
import { Friend } from "./friend/Friend"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { UserResponseType } from "../../../api/social-network-api"
import { Button } from "../../micro/button/Button"
import { Icon } from "../../micro/icon/Icon"
import { FlexWrapper } from "../../micro/FlexWrapper.styled"


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
            <FlexWrapper justify={'center'}>
                <Button onClick={props.refreshFriends}
                    variant={'link'}
                    className={props.className} ><Icon iconId={'refresh'} /></Button>
            </FlexWrapper>
        </StyledFriends>
    )
}
const StyledFriends = styled(BlockSection)`
    width: 100%;
`

const StyledFriendsList = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    @media ${theme.media.mobile} {
        flex-direction: row;
        flex-wrap: wrap;
    }
`