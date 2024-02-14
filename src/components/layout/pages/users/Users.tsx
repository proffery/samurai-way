import React from "react"
import { UsersBlockContainer } from "../../../blocks/usersBlock/UsersBlockContainer"
import { FriendsBlockContainer } from "../../../blocks/friendsBlock/FriendsBlockContainer"
import styled from "styled-components"
import { FlexWrapper } from "../../../micro/FlexWrapper.styled"
import { PossibleFriendsBlockContainer } from "../../../blocks/friendsBlock/PossibleFriendsBlockContainer"
import { ToTopLink } from "../../../micro/toTopLink/ToTopLink"

type UsersPropsType = {

}

export const Users: React.FC<UsersPropsType> = (props) => {
    return (
        <StyledUsers id="users">
            <UsersBlockContainer />
            <FlexWrapper direction={'column'} gap="30px">
                <FriendsBlockContainer />
                <PossibleFriendsBlockContainer />
            </FlexWrapper>
            <ToTopLink top_block_anchor_id="all-users"/>
        </StyledUsers>
    )
}

const StyledUsers = styled.main`
    display: flex;
    justify-content: space-between;
`