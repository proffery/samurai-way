import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { User } from "./user/User"
import styled from "styled-components"
import { UserStateType } from "../../../api/social-network-api"
import { FlexWrapper } from "../../micro/FlexWrapper"
import { UserPagination } from "./UserPagination"

export type UsersBlockPropsType = {
    users: UserStateType[]
    currentPage: number
    pagesCountArray: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, usersOnPage: number) => void
    onPageChangeHandler: (pageNumber: number) => void
}

export const UsersBlock: React.FC<UsersBlockPropsType> = (props) => {


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
            <FlexWrapper justify="center" gap="10px" wrap="wrap">
                <UserPagination
                    pagesCountArray={props.pagesCountArray}
                    currentPage={props.currentPage}
                    onPageChangeHandler={props.onPageChangeHandler}
                />
            </FlexWrapper>
        </StyledUsersBlock>
    )
}

const StyledUsersBlock = styled(BlockSection)`
    display: flex;
    width: 85%;
    min-width: 75%;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 65px;
`
