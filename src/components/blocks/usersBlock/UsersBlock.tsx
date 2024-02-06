import { useEffect } from "react"
import { UserStateType } from "../../../redux/usersReducer"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { User } from "./user/User"
import styled from "styled-components"

export type UsersBlockPropsType = {
    users: UserStateType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: () => void
}

export const UsersBlock: React.FC<UsersBlockPropsType> = (props) => {
    
    useEffect(() => {
        props.getUsers()
    }, [])

    const usersList = () => {
        return (
            <>
                {props.users.map(user =>
                    <User
                        key={user.id}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        user={user}
                    />
                )}
            </>
        )
    }

    return (
        <StyledUsersBlock id="all-users">
            <BlockHeader>Users</BlockHeader>
            {usersList()}
        </StyledUsersBlock>
    )
}

const StyledUsersBlock = styled(BlockSection)`
    display: flex;
    width: 85%;
    min-width: 60%;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 65px;
`
