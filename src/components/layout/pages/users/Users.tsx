import React from "react"
import { UsersBlockContainer } from "../../../blocks/usersBlock/UsersBlockContainer"
import { FriendsBlockContainer } from "../../../blocks/friendsBlock/FriendsBlockContainer"
import styled from "styled-components"

type UsersPropsType = {

}

export const Users: React.FC<UsersPropsType> = (props) => {
    return (
        <StyledUsers id="users">
            <UsersBlockContainer />
            <FriendsBlockContainer />
        </StyledUsers>
    )
}

const StyledUsers = styled.main`
    display: flex;
    justify-content: space-between;
`