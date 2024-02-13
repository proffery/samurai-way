import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { User } from "./user/User"
import styled from "styled-components"
import { UserStateType } from "../../../api/social-network-api"
import { FlexWrapper } from "../../micro/FlexWrapper"
import { UsersPagination } from "./UsersPagination"
import { Button } from "../../micro/button/Button"
import { UsersFilterType } from "../../../redux/usersReducer"
import { RequestStatusType } from "../../../redux/appReducer"


export type UsersBlockPropsType = {
    users: UserStateType[]
    usersFilter: UsersFilterType
    currentPage: number
    usersOnPage: number
    totalUsersCount: number
    appRequestStatus: RequestStatusType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getAllUsers: (currentPage: number, usersOnPage: number) => void
    onPageChangeHandler: (pageNumber: number) => void
    filterChangeHandler: (filter: UsersFilterType) => void
}

export const UsersBlock: React.FC<UsersBlockPropsType> = (props) => {


    const usersList = () => {
        return (
            <>
                {props.users.map(user =>
                    <User
                        key={user.id}
                        user={user}
                        appRequestStatus={props.appRequestStatus}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
                )}
            </>
        )
    }

    const onAllFilterChangeHandler = () => {
        props.filterChangeHandler("all")
    }
    const onFriendsFilterChangeHandler = () => {
        props.filterChangeHandler("followed")
    }
    const onPossibleFilterChangeHandler = () => {
        props.filterChangeHandler("unfollowed")
    }

    return (
        <StyledUsersBlock id="all-users">
            <BlockHeader>Users</BlockHeader>
            <FlexWrapper justify="center" gap="20px">
                <Button name={'All'}
                    variant={'link'}
                    isActive={props.usersFilter === 'all'}
                    disabled={props.appRequestStatus === 'loading'}
                    onClick={onAllFilterChangeHandler}
                />
                <Button name={'Followed'}
                    variant={'link'}
                    isActive={props.usersFilter === 'followed'}
                    disabled={props.appRequestStatus === 'loading'}
                    onClick={onFriendsFilterChangeHandler}
                />
                <Button name={'Unfollowed'}
                    variant={'link'}
                    isActive={props.usersFilter === 'unfollowed'}
                    disabled={props.appRequestStatus === 'loading'}
                    onClick={onPossibleFilterChangeHandler}
                />
            </FlexWrapper>
            {usersList()}
            <FlexWrapper justify="center" gap="10px" wrap="wrap">
                <UsersPagination
                    totalUsersCount={props.totalUsersCount}
                    usersOnPage={props.usersOnPage}
                    currentPage={props.currentPage}
                    usersFilter={props.usersFilter}
                    appRequestStatus={props.appRequestStatus}
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
