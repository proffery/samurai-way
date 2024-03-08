import { BlockHeader } from "../../micro/BlockHeader.styled"
import { BlockSection } from "../../micro/BlockSection.styled"
import { User } from "./user/User"
import styled from "styled-components"
import { FlexWrapper } from "../../micro/FlexWrapper.styled"
import { Pagination } from "../../micro/pagination/Pagination"
import { Button } from "../../micro/button/Button"
import { UsersFilterType, UsersStateType } from "../../../redux/users/usersReducer"
import { theme } from "../../../styles/Theme.styled"


export type UsersBlockPropsType = {
    usersData: UsersStateType
    appIsLoading: boolean
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getAllUsers: (currentPage: number, usersOnPage: number) => void
    onPageChangeHandler: (pageNumber: number) => void
    filterChangeHandler: (filter: UsersFilterType) => void
}

export const UsersBlock: React.FC<UsersBlockPropsType> = (props) => {
    const { usersFilter, totalUsersCount, usersOnPage, currentPage } = props.usersData
    const usersList = () => {
        return (
            <>
                {props.usersData.users.map(user =>
                    <User
                        key={user.id}
                        user={user}
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
                <Button
                    variant={'link'}
                    isActive={usersFilter === 'all'}
                    disabled={props.appIsLoading}
                    onClick={onAllFilterChangeHandler}
                >{'All'}</Button>
                <Button
                    variant={'link'}
                    isActive={usersFilter === 'followed'}
                    disabled={props.appIsLoading}
                    onClick={onFriendsFilterChangeHandler}
                >{'Followed'}</Button>
                <Button
                    variant={'link'}
                    isActive={usersFilter === 'unfollowed'}
                    disabled={props.appIsLoading}
                    onClick={onPossibleFilterChangeHandler}
                >{'Unfollowed'}</Button>
            </FlexWrapper>
            {usersList()}
            <Pagination
                totalUsersCount={totalUsersCount}
                usersOnPage={usersOnPage}
                currentPage={currentPage}
                appIsLoading={props.appIsLoading}
                onPageChangeHandler={props.onPageChangeHandler}
                pagesNumber={8}
            />
        </StyledUsersBlock>
    )
}

const StyledUsersBlock = styled(BlockSection)`
    display: flex;
    width: 100%;
    height: 132vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 65px;
    @media ${theme.media.mobile} {
        width: 100%;
    }
`